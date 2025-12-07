// Crear query para uploads
const queriesUploads = {

    crearUpload: `
        INSERT INTO uploads (filename, originalname, mimetype, size, nombre, descripcion)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id_upload
    `,

    pedirUploads: `
        SELECT * 
        FROM uploads
    `,

    pedirUploadPorId: `
        SELECT * 
        FROM uploads
        WHERE id_upload = $1
    `,

    editandoUpload: `
        UPDATE uploads
        SET filename = $1, originalname = $2, mimetype = $3, size = $4, nombre = $5, descripcion = $6
        WHERE id_upload = $7
        RETURNING *
    `,

    eliminandoUpload: `
        DELETE FROM uploads
        WHERE id_upload = $1
    `
}

module.exports = queriesUploads;