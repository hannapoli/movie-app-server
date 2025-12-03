const express = require('express');
const { eliminarUsuarioModel, actualizarUsuarioModel, obtenerUsuarioModel } = require("../models/user.model");


//eliminar usuario
const eliminarUsuario  = async (req, res) => {
   const correo_usuario = req.body.email;
    try {
        await eliminarUsuarioModel(correo_usuario)
        res.status(200).json({
            ok:true,
            msg: "Usuario eliminado"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: "Error al eliminar el usuario"
        });
    }
}

//obtener usuario
const obtenerUsuario = async (req, res) => {
    //console.log(req.params, "desde req params");
    const { id } = req.params;
    
    try {
        const usuario = await obtenerUsuarioModel(id);
        //console.log(usuario, "desde el usuario");
        
        if (!usuario) {
            return res.status(404).json({ 
                ok:false,
                msg: "Usuario no encontrado" 
            });
        }
        res.status(200).json(usuario);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: "Error al obtener usuario" 
        });
    }
};

//editar usuario
const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre_usuario, email, role_usuario, contrasena } = req.body;
    
    try {
        const datos = { nombre_usuario, email, role_usuario, contrasena };
        //console.log(datos);
        const actualizado = await actualizarUsuarioModel(id, datos);
        //console.log(actualizado);
        
        if (!actualizado) {
            return res.status(404).json({ 
                ok:false,
                msg: "Usuario no encontrado" 
            });
        }
        res.status(200).json({ 
            ok:true,
            msg: "Usuario actualizado" 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
             msg: "Error al actualizar usuario" 
            });
    }
};


module.exports = {    
    eliminarUsuario,
    editarUsuario,
    obtenerUsuario
};