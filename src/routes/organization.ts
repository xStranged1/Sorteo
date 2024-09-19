
import express, { Request, Response } from 'express';
import { Organization, Sorteo } from '../models';
import { msgDescriptionLength, msgDescriptionString, msgNameRequired, msgServerError } from '../errors/errorMessage';
const router = express.Router()


// create a organization
router.post('/', async (req: Request, res: Response) => {

    try {
        const { name, description } = req.body;
        if (!name || typeof name !== 'string') return res.status(400).json({ error: msgNameRequired });
        if (description) {
            if (typeof description !== 'string') return res.status(400).json({ error: msgDescriptionString });
            if (description.length > 1500) return res.status(400).json({ error: msgDescriptionLength });
        }

        Organization.create({ name: name, description: description })
            .then((organization) => {
                return res.status(201).json(organization)
            })
            .catch((err) => {
                if (err.name == 'SequelizeUniqueConstraintError') return res.status(400).json({ error: `name: '${name}' already exists` })
                return res.status(500).json({ error: msgServerError })
            })
    } catch (e) {
        return res.status(500).json({ error: msgServerError })
    }

});
// get all Organizations
router.get('/', async (req: Request, res: Response) => {
    const organization = await Organization.findAll({ include: Sorteo });
    res.status(200).json(organization)
});

// update a Organization
router.patch('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, description } = req.body
    if (typeof name != 'string') return res.status(400).json({ error: msgNameRequired })
    Organization.update({ name: name, description: description }, { where: { id: id } })
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