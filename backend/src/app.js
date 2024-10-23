import express from 'express'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Rutas
app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi API!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
