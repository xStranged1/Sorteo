
import express, { Request, Response } from 'express';
import { Organization, Sorteo } from '../models';
import { msgNameRequired, msgServerError } from '../errors/errorMessage';
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
// get all Organizations
router.get('/', async (req: Request, res: Response) => {
    const sorteos = await Organization.findAll({ include: Sorteo });
    res.status(200).json(sorteos)
});

// update a Organization
router.patch('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    if (typeof name != 'string') return res.status(400).json({ error: msgNameRequired })
    Organization.update({ name: name }, { where: { id: id } })
        .then(() => { return res.status(200).json() })
        .catch((error) => {
            return res.status(500).json({ error: msgServerError })
        })
});


// delete a Organization
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    Organization.destroy({ where: { id: id } })
        .then(() => { return res.status(200).json() })
        .catch(() => { return res.status(500).json({ error: msgServerError }) })
});




export default router;