CREATE DATABASE IF NOT EXISTS soporte_informatico;
USE soporte_informatico;

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE empleados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_completo VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  departamento VARCHAR(80) NOT NULL,
  fecha_ingreso DATE NOT NULL,
  foto VARCHAR(255)
);

CREATE TABLE equipos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_categoria INT NOT NULL,
  marca VARCHAR(50) NOT NULL,
  modelo VARCHAR(50) NOT NULL,
  numero_serie VARCHAR(100) NOT NULL UNIQUE,
  estado ENUM('Disponible', 'Asignado', 'En Reparación') NOT NULL DEFAULT 'Disponible',
  CONSTRAINT fk_equipos_categorias
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);

CREATE TABLE asignaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_equipo INT NOT NULL,
  id_empleado INT NOT NULL,
  fecha_entrega DATE NOT NULL,
  observaciones TEXT,
  CONSTRAINT fk_asignaciones_equipos
    FOREIGN KEY (id_equipo) REFERENCES equipos(id),
  CONSTRAINT fk_asignaciones_empleados
    FOREIGN KEY (id_empleado) REFERENCES empleados(id)
);

INSERT INTO categorias (nombre) VALUES
('Laptop'),
('Desktop'),
('Red');

INSERT INTO empleados (nombre_completo, email, departamento, fecha_ingreso, foto) VALUES
('Javier Sánchez', 'javier.sanchez@empresa.com', 'IT', '2020-03-09', 'https://picsum.photos/200'),
('Ana Torres', 'ana.torres@empresa.com', 'RRHH', '2021-07-12', 'https://picsum.photos/201');

INSERT INTO equipos (id_categoria, marca, modelo, numero_serie, estado) VALUES
(1, 'Dell', 'Latitude 5420', 'SN-002-DELL', 'Asignado'),
(3, 'Cisco', 'Catalyst 2960', 'SN-015-CISCO', 'Asignado');

INSERT INTO asignaciones (id_equipo, id_empleado, fecha_entrega, observaciones) VALUES
(1, 1, '2026-03-03', 'Equipo principal de trabajo'),
(2, 1, '2026-03-03', 'Switch para laboratorio de red');
