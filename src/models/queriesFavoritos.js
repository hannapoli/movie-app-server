const queriesFav = {
    createFav: `
    INSERT INTO favoritos(id_pelicula, id_usuario)
    VALUES($1,$2);`,
    eliminarFav: `
    DELETE FROM favoritos WHERE id_favorito = $1;
    `,
    todoLosFavUser:`
    SELECT * 
    FROM favoritos 
    WHERE id_usuario = $1
    `,
    buscarExiste: `
    SELECT * 
    FROM favoritos 
    WHERE id_pelicula = $1 AND id_usuario = $2
    `
}

module.exports = queriesFav;