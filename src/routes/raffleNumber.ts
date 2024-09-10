import express, { Request, Response } from 'express';
import { Sorteo, User } from '../models';
import { RaffleNumber } from '../models/raffleNumber';
import { msgSorteoIdRequired } from '../errors/errorMessage';

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

// delete a raffleNumber
router.delete('/', async (req: Request, res: Response) => {
    const { raffleNumberId } = req.query
    if (!raffleNumberId) return res.status(400).json({ error: `The "raffleNumberId" query parameter is required.` });
    RaffleNumber.destroy({ where: { id: raffleNumberId } })
        .then(() => { return res.status(200).json() })
        .catch(() => { return res.status(500).json({ error: `The "raffleNumberId" does not exist ` }) })
});


export default router;

