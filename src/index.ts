import express, { Request, Response } from 'express';
import { sequelize } from './config/config';
import { User } from './models/user';
import userRoute from './routes/user';
import sorteoRoute from './routes/sorteo';
import sellerRoute from './routes/seller';
import organizationRoute from './routes/organization';
import raffleNumberRoute from './routes/raffleNumber';
import { Organization, Sorteo } from './models';
import cors from 'cors';
import { checkConstraints, dropNumberUniqueConstraint } from './utils/utils';

require('dotenv').config();

const app = express();
app.use(cors())
const port = process.env.PORT || 8080;
const FORCE: any = process.env.FORCE_SYNC || false

// Middleware para parsear JSON
app.use(express.json());

const connectPostgre = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


const initSequalize = async () => {
    await connectPostgre()
    await sequelize.sync();
    console.log('All models were synchronized successfully.');

    // checkConstraints()
    // dropNumberUniqueConstraint()
}

const routes = [
    {
        path: '/organization',
        route: organizationRoute,
    },
    {
        path: '/seller',
        route: sellerRoute,
    },
    {
        path: '/sorteo',
        route: sorteoRoute,
    },
    {
        path: '/user',
        route: userRoute,
    },
    {
        path: '/raffleNumber',
        route: raffleNumberRoute,
    },
];

routes.forEach((route) => {
    app.use(route.path, route.route);
});


// Iniciar el servidor
app.listen(port, async () => {
    try {
        console.log(`Servidor corriendo en http://localhost:${port}`);
        if (process.env.DONT_CONNECT) return

        await initSequalize()

        if (FORCE) {
            const organization: any = await Organization.create({ name: 'Casa la costa' });
            const sorteo = await Sorteo.create({ name: 'Sorteo de primavera', organizationId: organization.id, dateStart: '2024-09-30', numberCount: 500 })
        }
    } catch (e) {
        console.log(e);
    }

});


// TEST
app.post('/prueba', async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'El nombre es requerido y debe ser una cadena de texto.' });
    }
    const user: any = await User.create({ name: name, id_sorteo: 1 })
        .then(() => res.status(201).json(user))
        .catch((e) => res.status(500).json(e))
});