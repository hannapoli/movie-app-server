DROP TABLE favoritos;
DROP TABLE peliculas;
DROP TABLE usuarios;
DROP TABLE uploads;

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    role_usuario VARCHAR(20) DEFAULT('user') NOT NULL ,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    CONSTRAINT ck_role_usuario CHECK (role_usuario IN ('user', 'administrador'))
);

CREATE TABLE uploads (
    id_upload SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    originalname VARCHAR(255) NOT NULL,
    mimetype VARCHAR(100) NOT NULL,
    size BIGINT NOT NULL,
    nombre VARCHAR(100),
    descripcion VARCHAR(300),
    uploaded_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE peliculas (
    id_pelicula SERIAL PRIMARY KEY,
    tit_pelicula VARCHAR(50) UNIQUE NOT NULL,
    id_upload INT,
    ano_pelicula INT NOT NULL,
    director VARCHAR(50) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    duracion VARCHAR(10) NOT NULL,
    CONSTRAINT fk_upload FOREIGN KEY (id_upload) REFERENCES uploads (id_upload) ON DELETE SET NULL
);


CREATE TABLE favoritos (
    id_favorito SERIAL PRIMARY KEY,
    id_pelicula INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT fk_peliculas FOREIGN KEY (id_pelicula) REFERENCES peliculas (id_pelicula),
    CONSTRAINT fk_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
);

INSERT INTO uploads (filename, originalname, mimetype, size, nombre)
VALUES
('shawshank.jpg', 'shawshank.jpg', 'image/jpeg', 50000, 'The Shawshank Redemption Poster'),
('godfather.jpg', 'godfather.jpg', 'image/jpeg', 50000, 'The Godfather Poster'),
('dark_knight.jpg', 'dark_knight.jpg', 'image/jpeg', 50000, 'The Dark Knight Poster');

INSERT INTO peliculas (tit_pelicula, id_upload, ano_pelicula, director, genero, duracion)
VALUES
('The Shawshank Redemption', 1, 1994, 'Frank Darabont', 'Drama', '142'),
('The Godfather', 2, 1972, 'Francis Ford Coppola', 'Crimen', '175'),
('The Dark Knight', 3, 2008, 'Christopher Nolan', 'Acción', '152');

INSERT INTO usuarios (nombre_usuario, role_usuario, email, contrasena)
VALUES
('admin1', 'administrador', 'admin@example.com', 'admin123'),
('usuario1', 'user', 'usuario1@example.com', 'user123'),
('usuario2', 'user', 'usuario2@example.com', 'user456');
