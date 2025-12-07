//IMPORTACIONES
const express = require('express');
const cors = require('cors');
const path = require('node:path');
require('dotenv').config();

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
app.use('/api/v1/uploads', express.static(path.join(__dirname, 'public/uploads')));

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
