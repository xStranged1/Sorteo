import express, { Request, Response } from 'express';
import { Seller, Sorteo, User } from '../models';
import { msgNameRequired, msgSorteoIdRequired } from '../errors/errorMessage';

const router = express.Router();
// get all users
router.get('/', async (req: Request, res: Response) => {
    const users = await User.findAll({ include: Sorteo });
    res.status(200).json(users)
});

// create a user
router.post('/', async (req: Request, res: Response) => {

    try {
        const { name, sorteoId } = req.body;
        let { phone } = req.body
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: msgNameRequired });
        }
        if (phone) {
            if (typeof phone !== 'string')
                phone = phone.toString()
        }

        if (sorteoId) {
            const sorteo = await Sorteo.findByPk(sorteoId);
            if (!sorteo) return res.status(400).json({ error: msgSorteoIdRequired })
            const newUser = await User.create({ name: name, phone: phone }) as any
            (sorteo as any).addUser(newUser)
            return res.status(201).json(newUser)
        }

        User.create({ name: name, phone: phone })
            .then((user) => { return res.status(201).json(user) })
            .catch((e) => {
                console.log(e);
                return res.status(500).json({ error: 'Server error' })
            })

    } catch (e) {
        return res.status(500).json({ error: 'Server error' })
    }
});

export default router;

