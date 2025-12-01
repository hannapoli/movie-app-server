const express = require('express');
const pool = require('../configs/dbConnect');
const { crearUsario } = require("../models/user.model");


//crear usuario
const creandoUsuario = async (req, res) =>{
    const nuevoUsuario = req.body;

    try {
        const response = await crearUsario(nuevoUsuario)
        console.log(response, "desde response")
        res.status(201).json({
            message: "Usuario creado exitosamente", 
            user: response
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error al crear el usuario"
        });
    }
}


//eliminar usuario
const eliminarUsuario  = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await pool.query(queries.deleteUser, [id]);
        res.status(200).json({message: "Usuario eliminado"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al eliminar el usuario"});
    }
}


//editar usuario
const editarUsuario = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre_usuario, role_usuario, email, contrasena } = req.body;   

    try {
        await pool.query(queries.updateUser, [nombre_usuario, role_usuario, email, contrasena, id]);
        res.status(200).json({message: "Usuario actualizado"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al actualizar el usuario"});
    }   
}


//obtener usuario
const obtenerUsuario = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query(queries.getUserById, [id]);
        res.status(200).json(result.rows[0]);       
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al obtener el usuario"});
    }
}

module.exports = {
    creandoUsuario,
    eliminarUsuario,
    editarUsuario,
    obtenerUsuario
};