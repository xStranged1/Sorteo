
import express, { Request, Response, Router } from 'express';
import { Sorteo } from '../models/sorteo';
import { isValidISO8601 } from '../utils/utils';
const router = express.Router()

// get all sorteos
router.get('/', async (req: Request, res: Response) => {
    const sorteos = await Sorteo.findAll();
    res.status(200).json(sorteos)
});

// create a sorteo
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, dateStart, organizationId } = req.body;
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'El nombre es requerido y debe ser una cadena de texto.' });
        }
        if (!organizationId) return res.status(400).json({ error: 'El sorteo debe estar asociado a una organizacion' });
        if (dateStart) {
            if (!isValidISO8601(dateStart)) return res.status(400).json({ error: 'La fecha debe ser en formato YYYY-MM-DD' });
        }

        const sorteo = await Sorteo.create({ name: name, dateStart: dateStart, organizationId: organizationId });
        return res.status(201).json(sorteo)

    } catch (e) {
        return res.status(500)
    }

});

export default router;