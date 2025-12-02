const Favorito = require('../models/favorito.model');

const crearFavorito = async (req, res) =>{
    const {id_pelicula, id_usuario} = req.body
    //console.log(id_pelicula, "id_pelicula")
    //console.log(id_usuario, "id_usuario")
    try {
        const buscando = await Favorito.buscarExistencia(id_pelicula, id_usuario);
        //console.log(buscando)
        if(buscando.length <= 0){
            await Favorito.crearFavorito(id_pelicula, id_usuario)
            return res.status(201).json({
                ok:true,
                msg: `El favorito fue creado correctamente`,
            })
        }
        return res.status(409).json({
                ok:false,
                msg: `Ya esta agregado en favoritos`,
            })
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: `No se pudo crear `,
            error: error.message
        })
    }
};

const buscarTodosFavUsuario = async (req, res) =>{
    const id_usuario = req.params.id
    try {
        const favoritos = await Favorito.todosFavoritosDeUser(id_usuario);
        //mejorar consulta para tener mas datos
        console.log(favoritos);
        return res.status(201).json({
            ok:true,
            msg: `Estos son todos los favoritos`,
            data: favoritos
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: `No se pudo encontrar nada `,
            error: error.message
        })
    }
};

const eliminarFavorito = async (req, res) =>{
    const id_favorito = req.params.id
    try {
        const result = await Favorito.eliminarFavorito(id_favorito)
        //arreglar mañana buscar mas opciones
        return res.status(201).json({
            ok:true,
            msg: `Favorito eliminado correctamente`,
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: `No se puedo eliminar `,
            error: error.message
        })
    }
};


module.exports = {
    crearFavorito,
    buscarTodosFavUsuario,
    eliminarFavorito
}