//IMPORTACIONES
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4001;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


//RUTAS

//LISTENERS
app.listen( port, () =>{
    console.log(`Servidor activo en puerto ${port} 🐙​`)
})