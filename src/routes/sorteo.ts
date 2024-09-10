
import express, { Request, Response } from 'express';
import { isValidISO8601 } from '../utils/utils';
import { Sorteo } from '../models';
import { msgDateFormatError, msgNameRequired, msgServerError } from '../errors/errorMessage';
const router = express.Router()

// get all sorteos
router.get('/', async (req: Request, res: Response) => {
    const sorteos = await Sorteo.findAll();
    res.status(200).json(sorteos)
});


router.get('/', async (req: Request, res: Response) => {
    const { sorteoId } = req.query
    const sorteos = await Sorteo.findAll();
    res.status(200).json(sorteos)
});

// create a sorteo
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, dateStart, SorteoId } = req.body;
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: msgNameRequired });
        }
        if (!SorteoId) return res.status(400).json({ error: 'The raffle must be associated with an Sorteo.' });
        if (dateStart) {
            if (!isValidISO8601(dateStart)) return res.status(400).json({ error: msgDateFormatError });
        }

        Sorteo.create({ name: name, dateStart: dateStart, SorteoId: SorteoId })
            .then((sorteo) => { return res.status(201).json(sorteo) })
            .catch((e) => { return res.status(500).json({ error: 'invalid UUID Sorteo' }) })

    } catch (e) {
        return res.status(500)
    }

});


// update a Sorteo
router.patch('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, dateStart } = req.body
    if (name) {
        if (typeof name != 'string') return res.status(400).json({ error: msgNameRequired })
    }
    if (dateStart) {
        if (!isValidISO8601(dateStart)) return res.status(400).json({ error: msgDateFormatError });
    }
    Sorteo.update({ name: name, dateStart: dateStart }, { where: { id: id } })
        .then(() => { return res.status(200).json() })
        .catch(() => { return res.status(500).json({ error: msgServerError }) })
});


// delete a Sorteo
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    Sorteo.destroy({ where: { id: id } })
        .then(() => { return res.status(200).json() })
        .catch(() => { return res.status(500).json({ error: msgServerError }) })
});

export default router;