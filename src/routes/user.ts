import express, { Request, Response, Router } from 'express';
import { Sorteo, User } from '../models';

const router = express.Router();
// get all users
router.get('/', async (req: Request, res: Response) => {
    const users = await User.findAll({ include: Sorteo });
    res.status(200).json(users)
});

// create a user
router.post('/', async (req: Request, res: Response) => {
    const { name, idSorteo } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'El nombre es requerido y debe ser una cadena de texto.' });
    }
    const user = await User.create({ name: name, idSorteo: idSorteo });
    // const jane = User.build({ name: 'Jane' }); lo mismo que esto
    // await jane.save()

    // console.log(user.toJSON());
    // console.log(user.id);
    res.status(201).json(user)
});

export default router;

