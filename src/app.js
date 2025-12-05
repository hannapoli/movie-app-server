//IMPORTACIONES
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4001;
const frontendUrl = 'https://movie-app-ne82.onrender.com';
const corsOptions = {
    origin: frontendUrl,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));


//RUTAS
app.use('/api/v1', require('./routes/auth.routes'));
app.use('/api/v1', require('./routes/users.routes'));
app.use('/api/v1', require('./routes/favoritos.routes'))
app.use('/api/v1', require('./routes/movies.routes'))

//LISTENERS
app.listen(port, () => {
    console.log(`Servidor activo en puerto ${port} 🐙​`)
})