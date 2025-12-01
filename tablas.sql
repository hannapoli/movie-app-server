CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    role_usuario VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    contrasena TEXT NOT NULL,
    CONSTRAINT ck_role_usuario CHECK (role_usuario IN ('user', 'administrador'))
);

CREATE TABLE peliculas (
    id_pelicula SERIAL PRIMARY KEY,
    tit_pelicula VARCHAR(50) NOT NULL,
    img_pelicula VARCHAR(255),
    ano_pelicula INT,
    director VARCHAR(50),
    genero VARCHAR(50),
    duracion VARCHAR(10)
);


CREATE TABLE favoritos (
    id_favorito SERIAL PRIMARY KEY,
    id_pelicula INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT fk_peliculas FOREIGN KEY (id_pelicula) REFERENCES peliculas (id_pelicula),
    CONSTRAINT fk_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
);
