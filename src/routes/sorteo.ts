
import express, { Request, Response } from 'express';
import { isValidISO8601 } from '../utils/utils';
import { Sorteo } from '../models';
import { msgNameRequired } from '../errors/errorMessage';
const router = express.Router()

// get all sorteos
router.get('/', async (req: Request, res: Response) => {
    const sorteos = await Sorteo.findAll();
    res.status(200).json(sorteos)
});


router.get('/', async (req: Request, res: Response) => {
    const { sorteoId } = req.params
    const sorteos = await Sorteo.findAll();
    res.status(200).json(sorteos)
});

// create a sorteo
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, dateStart, organizationId } = req.body;
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: msgNameRequired });
        }
        if (!organizationId) return res.status(400).json({ error: 'The raffle must be associated with an organization.' });
        if (dateStart) {
            if (!isValidISO8601(dateStart)) return res.status(400).json({ error: 'Incorrect date format, should be: `YYYY-MM-DD`' });
        }

        Sorteo.create({ name: name, dateStart: dateStart, organizationId: organizationId })
            .then((sorteo) => { return res.status(201).json(sorteo) })
            .catch((e) => { return res.status(500).json({ error: 'invalid UUID Organization' }) })

    } catch (e) {
        return res.status(500)
    }

});

export default router;