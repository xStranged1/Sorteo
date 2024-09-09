
import express, { Request, Response, Router } from 'express';
import { Sorteo } from '../models/sorteo';
const router = express.Router()

// get all sorteos
router.get('/', async (req: Request, res: Response) => {
    const sorteos = await Sorteo.findAll();
    res.status(200).json(sorteos)
});

// create a sorteo
router.post('/', async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'El nombre es requerido y debe ser una cadena de texto.' });
    }
    const user = await Sorteo.create({ name: name });
    res.status(201).json(user)
});

export default router;