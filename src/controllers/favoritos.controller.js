const Favorito = require('../models/favorito.model');

const crearFavorito = async (req, res) =>{
    const {id_pelicula, id_usuario} = req.body
    
    try {
        const encontrado = await Favorito.buscarExistencia(id_pelicula, id_usuario);
        
        if(encontrado.length <= 0){
            const newFavorito = await Favorito.crearFavorito(id_pelicula, id_usuario)
            return res.status(201).json({
                ok:true,
                msg: `El favorito fue creado correctamente`,
                data: newFavorito
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
        //console.log(favoritos);
        if(favoritos.length == 0){
            return res.status(201).json({
                ok:true,
                msg: `Este usuario no tiene favoritos`
            })
        }
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
    const { id_favorito, id_pelicula, id_usuario } = req.body

    try {
        const encontrado = await Favorito.buscarExistencia(id_pelicula, id_usuario);        
        if(encontrado.length > 0){
            const result = await Favorito.eliminarFavorito(id_favorito)
            return res.status(201).json({
                ok:true,
                msg: `Favorito eliminado correctamente`,
                resp: result

            })
        }
        return res.status(409).json({
                ok:false,
                msg: `El favorito no existe`,
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