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
('dark_knight.jpg', 'dark_knight.jpg', 'image/jpeg', 50000, 'The Dark Knight Poster'),
('pulp_fiction.jpg', 'pulp_fiction.jpg', 'image/jpeg', 50000, 'Pulp Fiction Poster'),
('fight_club.jpg', 'fight_club.jpg', 'image/jpeg', 50000, 'Fight Club Poster'),
('forrest_gump.jpg', 'forrest_gump.jpg', 'image/jpeg', 50000, 'Forrest Gump Poster'),
('inception.jpg', 'inception.jpg', 'image/jpeg', 50000, 'Inception Poster'),
('matrix.jpg', 'matrix.jpg', 'image/jpeg', 50000, 'The Matrix Poster'),
('interstellar.jpg', 'interstellar.jpg', 'image/jpeg', 50000, 'Interstellar Poster'),
('gladiator.jpg', 'gladiator.jpg', 'image/jpeg', 50000, 'Gladiator Poster'),
('titanic.jpg', 'titanic.jpg', 'image/jpeg', 50000, 'Titanic Poster'),
('avengers.jpg', 'avengers.jpg', 'image/jpeg', 50000, 'The Avengers Poster'),
('avatar.jpg', 'avatar.jpg', 'image/jpeg', 50000, 'Avatar Poster'),
('lion_king.jpg', 'lion_king.jpg', 'image/jpeg', 50000, 'The Lion King Poster'),
('toy_story.jpg', 'toy_story.jpg', 'image/jpeg', 50000, 'Toy Story Poster'),
('saving_private_ryan.jpg', 'saving_private_ryan.jpg', 'image/jpeg', 50000, 'Saving Private Ryan Poster'),
('green_mile.jpg', 'green_mile.jpg', 'image/jpeg', 50000, 'The Green Mile Poster'),
('braveheart.jpg', 'braveheart.jpg', 'image/jpeg', 50000, 'Braveheart Poster'),
('social_network.jpg', 'social_network.jpg', 'image/jpeg', 50000, 'The Social Network Poster'),
('whiplash.jpg', 'whiplash.jpg', 'image/jpeg', 50000, 'Whiplash Poster');

INSERT INTO peliculas (tit_pelicula, id_upload, ano_pelicula, director, genero, duracion)
VALUES
('The Shawshank Redemption', 1, 1994, 'Frank Darabont', 'Drama', '142'),
('The Godfather', 2, 1972, 'Francis Ford Coppola', 'Crimen', '175'),
('The Dark Knight', 3, 2008, 'Christopher Nolan', 'Acción', '152'),
('Pulp Fiction', 4, 1994, 'Quentin Tarantino', 'Crimen', '154'),
('Fight Club', 5, 1999, 'David Fincher', 'Drama', '139'),
('Forrest Gump', 6, 1994, 'Robert Zemeckis', 'Drama', '142'),
('Inception', 7, 2010, 'Christopher Nolan', 'Ciencia Ficción', '148'),
('The Matrix', 8, 1999, 'Lana y Lilly Wachowski', 'Ciencia Ficción', '136'),
('Interstellar', 9, 2014, 'Christopher Nolan', 'Ciencia Ficción', '169'),
('Gladiator', 10, 2000, 'Ridley Scott', 'Acción', '155'),
('Titanic', 11, 1997, 'James Cameron', 'Romance', '195'),
('The Avengers', 12, 2012, 'Joss Whedon', 'Acción', '143'),
('Avatar', 13, 2009, 'James Cameron', 'Ciencia Ficción', '162'),
('The Lion King', 14, 1994, 'Roger Allers', 'Animación', '88'),
('Toy Story', 15, 1995, 'John Lasseter', 'Animación', '81'),
('Saving Private Ryan', 16, 1998, 'Steven Spielberg', 'Guerra', '169'),
('The Green Mile', 17, 1999, 'Frank Darabont', 'Drama', '189'),
('Braveheart', 18, 1995, 'Mel Gibson', 'Histórica', '178'),
('The Social Network', 19, 2010, 'David Fincher', 'Drama', '120'),
('Whiplash', 20, 2014, 'Damien Chazelle', 'Drama', '106');

INSERT INTO usuarios (nombre_usuario, role_usuario, email, contrasena)
VALUES
('admin1', 'administrador', 'admin@example.com', 'admin123'),
('usuario1', 'user', 'usuario1@example.com', 'user123'),
('usuario2', 'user', 'usuario2@example.com', 'user456');
