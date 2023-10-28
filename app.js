const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./auth/login');
const listEditRoutes = require('./routes/list-edit-router');
const listViewRoutes = require('./routes/list-view-router');
const app = express();

// Middleware
app.use(bodyParser.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB establecida');
  })
  .catch((error) => {
    console.error('Error de conexión a MongoDB: ', error);
  });

// Rutas
app.use('/auth', authRoutes);
app.use('/list/edit', listEditRoutes);
app.use('/list/view', listViewRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
