import express, { Request, Response } from 'express';
import { sequelize } from './config/config';
import { User } from './models/user';
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

// Ruta de ejemplo
app.get('/', (req: Request, res: Response) => {
    res.send('¡Hola, mundo!');
});

// CRUD para recursos (ejemplo: tareas)
interface Tarea {
    id: number;
    nombre: string;
}

const tareas: Tarea[] = [];

// get all users
app.get('/user', async (req: Request, res: Response) => {
    const users = await User.findAll();
    res.status(200).json(users)
});

// create a user
app.post('/user', async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'El nombre es requerido y debe ser una cadena de texto.' });
    }

    const user = await User.create({ name: name });
    // const jane = User.build({ name: 'Jane' }); lo mismo que esto
    // await jane.save()

    // console.log(user.toJSON());
    // console.log(user.id);
    res.status(201).json(user)
});

// Obtener una tarea por ID
app.get('/tareas/:id', (req: Request, res: Response) => {
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) return res.status(404).send('Tarea no encontrada');
    res.json(tarea);
});

// Actualizar una tarea
app.put('/tareas/:id', (req: Request, res: Response) => {
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) return res.status(404).send('Tarea no encontrada');

    Object.assign(tarea, req.body);
    res.json(tarea);
});

// Eliminar una tarea
app.delete('/tareas/:id', (req: Request, res: Response) => {
    const index = tareas.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Tarea no encontrada');

    tareas.splice(index, 1);
    res.status(204).send();
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    const sync = true
    initSequalize()
});
