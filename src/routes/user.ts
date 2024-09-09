import express, { Request, Response, Router } from 'express';
import { User } from '../models/user';

const router = express.Router();
// get all users
router.get('/', async (req: Request, res: Response) => {
    const users = await User.findAll();
    res.status(200).json(users)
});

// create a user
router.post('/', async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'El nombre es requerido y debe ser una cadena de texto.' });
    }
    const user = await User.create({ name: name, id_sorteo: 2 });
    // const jane = User.build({ name: 'Jane' }); lo mismo que esto
    // await jane.save()

    // console.log(user.toJSON());
    // console.log(user.id);
    res.status(201).json(user)
});

export default router;

