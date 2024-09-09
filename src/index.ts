import express, { Request, Response } from 'express';
import { sequelize } from './config/config';
import { User } from './models/user';
import userRoute from './routes/user';
import sorteoRoute from './routes/sorteo';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

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
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
}

const routes = [
    {
        path: '/user',
        route: userRoute,
    },
    {
        path: '/sorteo',
        route: sorteoRoute,
    },

];

routes.forEach((route) => {
    app.use(route.path, route.route);
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    const sync = true
    initSequalize()
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