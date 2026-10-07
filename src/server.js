import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sessionsRouter from './routes/sessions.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Conectado a MongoDB correctamente'))
  .catch((err) => console.error('Error conectando a MongoDB:', err));

// Rutas
app.use('/api/sessions', sessionsRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});