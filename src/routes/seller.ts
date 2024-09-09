import express, { Request, Response, Router } from 'express';
import { Seller, Sorteo } from '../models';

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
            return res.status(400).json({ error: 'El nombre es requerido y debe ser una cadena de texto.' });
        }
        if (sorteoId) {
            const sorteo = await Sorteo.findByPk(sorteoId);
            if (!sorteo) return res.status(400).json({ error: 'sorteoId provided does not exist' })
            const newSeller = await Seller.create({ name: name }) as any
            (sorteo as any).addSeller(newSeller)
            return res.status(201).json(newSeller)
        }

        Seller.create({ name: name })
            .then((seller) => { return res.status(201).json(seller) })
            .catch((e) => {
                return res.status(500).json({ error: 'Error de servidor' })
            })

    } catch (e) {

        return res.status(500)

    }

});

export default router;

