//IMPORTACIONES
const express = require('express');
const cors = require('cors');
const path = require('path'); // tu cambio
require('dotenv').config();

const uploadsRouter = require('./routes/uploads.routes'); // tu cambio

const app = express();
const port = process.env.PORT || 4001;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Servir archivos estáticos de la carpeta uploads (tu cambio)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

//RUTAS
app.use('/api/v1', require('./routes/auth.routes'));
app.use('/api/v1', require('./routes/users.routes'));
app.use('/api/v1', require('./routes/favoritos.routes'));
app.use('/api/v1', require('./routes/movies.routes'));

// Tu ruta de uploads
app.use('/api/v1', require('./routes/uploads.routes'));

//LISTENERS
app.listen(port, () => {
    console.log(`Servidor activo en puerto ${port} 🐙​`);
});
