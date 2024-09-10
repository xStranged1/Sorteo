import express, { Request, Response } from 'express';
import { Sorteo, User } from '../models';
import { RaffleNumber } from '../models/raffleNumber';
import { msgNameRequired, msgServerError, msgSorteoIdRequired } from '../errors/errorMessage';

const router = express.Router();

// get all numbers
router.get('/', async (req: Request, res: Response) => {
    const { name, sorteoId, raffleNumberId, userId } = req.query;
    const numbers = await RaffleNumber.findAll({ include: Sorteo });
    res.status(200).json(numbers)
});

// create a number
router.post('/', async (req: Request, res: Response) => {  // http://localhost:8080/raffleNumber?name=fede&sorteoId=2
    const { sorteoId, number, raffleNumberId, userId } = req.body;
    if (!number) return res.status(400).json({ error: 'The number is required' });
    if (!sorteoId) return res.status(400).json({ error: msgSorteoIdRequired });
    if (!raffleNumberId) return res.status(400).json({ error: 'The raffleNumberId is required' });
    if (!userId) return res.status(400).json({ error: 'The userId is required' });

    const numberParsed = parseInt(number, 10);
    if (typeof numberParsed != 'number') return res.status(400).json({ error: 'The `number` must be a valid number' });

    RaffleNumber.create({ number: numberParsed, sorteoId: sorteoId, raffleNumberId: raffleNumberId, userId: userId })
        .then((number) => { return res.status(201).json(number) })
        .catch((e) => { console.log(e); return res.status(500).json({ error: 'some error' }) })
});

// update a RaffleNumber
router.patch('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const { number } = req.body
    if (typeof name != 'string') return res.status(400).json({ error: msgNameRequired })
    RaffleNumber.update({ number: number }, { where: { id: id } })
        .then(() => { return res.status(200).json() })
        .catch(() => { return res.status(500).json({ error: msgServerError }) })
});


// delete a RaffleNumber
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    RaffleNumber.destroy({ where: { id: id } })
        .then(() => { return res.status(200).json() })
        .catch(() => { return res.status(500).json({ error: msgServerError }) })
});


export default router;

