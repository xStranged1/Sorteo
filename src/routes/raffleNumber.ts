import express, { Request, Response } from 'express';
import { Sorteo, User } from '../models';
import { RaffleNumber } from '../models/raffleNumber';
import { msgNameRequired, msgServerError, msgSorteoIdRequired } from '../errors/errorMessage';
import { Sequelize } from 'sequelize';

const router = express.Router();

// get all numbers
router.get('/', async (req: Request, res: Response) => {
    const { name, sorteoId, raffleNumberId, userId } = req.query;
    const numbers = await RaffleNumber.findAll({ include: Sorteo });
    res.status(200).json(numbers)
});

// create a number
router.post('/', async (req: Request, res: Response) => {  // http://localhost:8080/raffleNumber?name=fede&sorteoId=2
    const { sorteoId, number, userId, sellerId } = req.body;
    if (!number) return res.status(400).json({ error: 'The number is required' });
    if (!sorteoId) return res.status(400).json({ error: 'The sellerId is required' });
    if (!sellerId) return res.status(400).json({ error: msgSorteoIdRequired });
    if (!userId) return res.status(400).json({ error: 'The userId is required' });

    const numberParsed = parseInt(number, 10);
    if (typeof numberParsed != 'number') return res.status(400).json({ error: 'The `number` must be a valid number' });

    RaffleNumber.create({ number: numberParsed, sorteoId: sorteoId, userId: userId, sellerId: sellerId })

        //this dont valide user and seller with the same sorteo yet
        .then((number) => {
            Sorteo.update(
                { numberCount: Sequelize.literal('"numberCount" - 1') },
                { where: { id: sorteoId } }
            ).then(() => { console.log('nice') })
                .catch((e) => { console.log('Error updating numberCount'); })

            return res.status(201).json(number)
        })
        .catch((e) => { console.log(e); return res.status(500).json({ error: msgServerError }) })
});

// update a RaffleNumber
router.patch('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const { number } = req.body
    RaffleNumber.update({ number: number }, { where: { id: id } })
        .then(() => { return res.status(200).json() })
        .catch(() => { return res.status(500).json({ error: msgServerError }) })
});


// delete a RaffleNumber
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    RaffleNumber.destroy({ where: { id: id } })
        .then(() => {
            // dont decrement availableNumbers yet
            return res.status(200).json()
        })
        .catch(() => { return res.status(500).json({ error: msgServerError }) })
});


export default router;

