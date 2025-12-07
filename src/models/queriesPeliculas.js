// Crear query para peliculas
const queriesPeliculas = {

    pedirPeliculas: `
        SELECT p.*, u.filename, u.originalname, u.mimetype, u.size 
        FROM peliculas p
        LEFT JOIN uploads u ON p.id_upload = u.id_upload
    `,

    pedirPeliculaPorId: `
        SELECT p.*, u.filename, u.originalname, u.mimetype, u.size 
        FROM peliculas p
        LEFT JOIN uploads u ON p.id_upload = u.id_upload
        WHERE p.id_pelicula = $1
    `,

    pedirPeliculaPorTitulo: `
        SELECT p.*, u.filename, u.originalname, u.mimetype, u.size
        FROM peliculas p
        LEFT JOIN uploads u ON p.id_upload = u.id_upload
        WHERE p.tit_pelicula ILIKE '%' || $1 || '%'
    `,

    creandoPelicula: `
        INSERT INTO peliculas (tit_pelicula, id_upload, ano_pelicula, director, genero, duracion) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING id_pelicula
    `,
    editandoPelicula: `
        UPDATE peliculas SET tit_pelicula = $1, id_upload = $2, ano_pelicula = $3,
            director = $4, genero = $5, duracion = $6 
        WHERE id_pelicula = $7 
        RETURNING *
    `,

    verificarPelicula: `
        SELECT * FROM peliculas WHERE id_pelicula = $1
    `,


    eliminandoPelicula: `
        DELETE FROM peliculas WHERE id_pelicula = $1
    `
}

module.exports = queriesPeliculas;

