
import express, { Request, Response } from 'express';
import { Organization, Sorteo } from '../models';
import { msgNameRequired } from '../errors/errorMessage';
const router = express.Router()


// create a organization
router.post('/', async (req: Request, res: Response) => {

    try {
        const { name } = req.body;
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: msgNameRequired });
        }
        const organization = await Organization.create({ name: name });
        res.status(201).json(organization)
    } catch (e) {
        res.status(500)
    }

});
// get all sorteos
router.get('/', async (req: Request, res: Response) => {
    const sorteos = await Organization.findAll({ include: Sorteo });
    res.status(200).json(sorteos)
});


export default router;