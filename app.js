const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const domicilioRoute = require('./routes/domicilio');
const userRoute = require('./routes/user'); // Asegúrate de tener la ruta correcta hacia tus rutas de usuario

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/domicilio', domicilioRoute);
app.use('/api/user', userRoute);
 // Montar userRoute en /api/user

app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi API!');
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(port, () => {
      console.log('Servidor escuchando en el puerto', port);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

