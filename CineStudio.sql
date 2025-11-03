CREATE TABLE `usuario` (
  `id_ususario` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `rol` integer
);

CREATE TABLE `pelicula` (
  `id_pelicula` integer PRIMARY KEY AUTO_INCREMENT,
  `titulo` varchar(255),
  `fecha_estreno` date
);

CREATE TABLE `entrada` (
  `id_entrada` integer PRIMARY KEY AUTO_INCREMENT,
  `id_usuario` integer,
  `id_pase` integer,
  `estado_compra` integer
);

CREATE TABLE `pase` (
  `id_pase` integer PRIMARY KEY AUTO_INCREMENT,
  `id_pelicula` integer,
  `fecha` date,
  `hora` time,
  `sala` integer
);

ALTER TABLE `pase` ADD FOREIGN KEY (`id_pelicula`) REFERENCES `pelicula` (`id_pelicula`);

ALTER TABLE `entrada` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_ususario`);

ALTER TABLE `entrada` ADD FOREIGN KEY (`id_entrada`) REFERENCES `pase` (`id_pase`);
