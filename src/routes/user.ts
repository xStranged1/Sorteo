import express, { Request, Response } from 'express';
import { Seller, Sorteo, User } from '../models';
import { msgNameRequired, msgServerError, msgSorteoIdRequired } from '../errors/errorMessage';

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
        let phoneStr
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: msgNameRequired });
        }
        if (phone) {
            phoneStr = phone.toString()
            if (typeof phone !== 'string') return res.status(400).json({ error: `"phone" is invalid` })
        }

        if (sorteoId) {
            const sorteo = await Sorteo.findByPk(sorteoId);
            if (!sorteo) return res.status(400).json({ error: msgSorteoIdRequired })
            const newUser = await User.create({ name: name, phone: phoneStr }) as any
            (sorteo as any).addUser(newUser)
            return res.status(201).json(newUser)
        }

        User.create({ name: name, phone: phoneStr })
            .then((user) => { return res.status(201).json(user) })
            .catch((e) => {
                console.log(e);
                return res.status(500).json({ error: msgServerError })
            })

    } catch (e) {
        return res.status(500).json({ error: msgServerError })
    }
});

// update a User
router.patch('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, phone } = req.body
    let phoneStr
    if (!name && !phone) return res.status(400).json({ error: ` "name" or "phone" is required.` })
    if (name) {
        if (typeof name != 'string') return res.status(400).json({ error: msgNameRequired })
    }
    if (phone) {
        phoneStr = phone.toString()
        if (typeof phone !== 'string') return res.status(400).json({ error: `"phone" is invalid` })
    }
    User.update({ name: name, phone: phoneStr }, { where: { id: id } })
        .then(() => { return res.status(200).json() })
        .catch(() => { return res.status(500).json({ error: msgServerError }) })
});

// delete a User
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    User.destroy({ where: { id: id } })
        .then(() => { return res.status(200).json() })
        .catch(() => { return res.status(500).json({ error: msgServerError }) })
});


export default router;

