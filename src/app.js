//IMPORTACIONES
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const uploadsRouter = require('./routes/uploads.routes');

const app = express();
const port = process.env.PORT || 4001;
const frontendUrl = 'https://movie-app-ne82.onrender.com';
const localUrl = 'http://localhost:3002';
const whitelist = [frontendUrl, localUrl, "*"];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Esta conexión no está permitida por CORS'));
        }
    },
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Servir archivos estáticos de la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

//RUTAS
app.use('/api/v1', require('./routes/auth.routes'));
app.use('/api/v1', require('./routes/users.routes'));
app.use('/api/v1', require('./routes/favoritos.routes'));
app.use('/api/v1', require('./routes/movies.routes'));
app.use('/api/v1', require('./routes/uploads.routes'));

//LISTENERS
app.listen(port, () => {
    console.log(`Servidor activo en puerto ${port} 🐙​`);
});
