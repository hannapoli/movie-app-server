//IMPORTACIONES
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4001;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//RUTAS
app.use('/api/v1', require('./routes/users.routes'));

app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1', require('./routes/favoritos.routes'))

app.use('/api/v1', require('./routes/movies.routes'))
//LISTENERS
app.listen(port, () => {
    console.log(`Servidor activo en puerto ${port} 🐙​`)
})