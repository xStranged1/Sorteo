import express, { Request, Response } from 'express';
import { Seller, Sorteo } from '../models';
import { msgNameRequired, msgSorteoIdRequired } from '../errors/errorMessage';

const router = express.Router();
// get all seller
router.get('/', async (req: Request, res: Response) => {
    const sellers = await Seller.findAll({ include: Sorteo });
    res.status(200).json(sellers)
});

// create a seller
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, sorteoId } = req.body;
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: msgNameRequired });
        }
        if (sorteoId) {
            const sorteo = await Sorteo.findByPk(sorteoId);
            if (!sorteo) return res.status(400).json({ error: msgSorteoIdRequired })
            const newSeller = await Seller.create({ name: name }) as any
            (sorteo as any).addSeller(newSeller)
            return res.status(201).json(newSeller)
        }

        Seller.create({ name: name })
            .then((seller) => { return res.status(201).json(seller) })
            .catch((e) => {
                return res.status(500).json({ error: 'Server error' })
            })

    } catch (e) {

        return res.status(500)

    }

});

export default router;

