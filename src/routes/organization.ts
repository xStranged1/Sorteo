
import express, { Request, Response, Router } from 'express';
import { Organization } from '../models/organization';
const router = express.Router()

// get all sorteos
router.get('/', async (req: Request, res: Response) => {
    const sorteos = await Organization.findAll();
    res.status(200).json(sorteos)
});

// create a organization
router.post('/', async (req: Request, res: Response) => {

    try {
        const { name } = req.body;
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'El nombre es requerido y debe ser una cadena de texto.' });
        }
        const organization = await Organization.create({ name: name });
        res.status(201).json(organization)
    } catch (e) {
        res.status(500)
    }

});

export default router;