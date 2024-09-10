import express, { Request, Response } from 'express';
import { Sorteo, User } from '../models';
import { RaffleNumber } from '../models/raffleNumber';
import { msgSorteoIdRequired } from '../errors/errorMessage';

const router = express.Router();

// get all numbers
router.get('/', async (req: Request, res: Response) => {
    const { name, sorteoId, sellerId, userId } = req.params;
    const numbers = await RaffleNumber.findAll({ include: Sorteo });
    res.status(200).json(numbers)
});

// create a number
router.post('/', async (req: Request, res: Response) => {  // http://localhost:8080/raffleNumber?name=fede&sorteoId=2
    const { sorteoId, number, sellerId, userId } = req.body;
    if (!number) return res.status(400).json({ error: 'The number is required' });
    if (!sorteoId) return res.status(400).json({ error: msgSorteoIdRequired });
    if (!sellerId) return res.status(400).json({ error: 'The sellerId is required' });
    if (!userId) return res.status(400).json({ error: 'The userId is required' });

    const numberParsed = parseInt(number, 10);
    if (typeof numberParsed != 'number') return res.status(400).json({ error: 'The `number` must be a valid number' });

    RaffleNumber.create({ number: numberParsed, sorteoId: sorteoId, sellerId: sellerId, userId: userId })
        .then((number) => { return res.status(201).json(number) })
        .catch((e) => { console.log(e); return res.status(500).json({ error: 'some error' }) })
});

export default router;

