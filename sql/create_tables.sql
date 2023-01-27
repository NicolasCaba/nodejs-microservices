CREATE DATABASE nodejs
    WITH
    ENCODING = 'UTF8';

\c nodejs;

CREATE SCHEMA IF NOT EXISTS prueba_tecnica;

CREATE TABLE IF NOT EXISTS prueba_tecnica.productos (
	id serial NOT NULL,
	nombre VARCHAR(100) NOT NULL,
	precio DOUBLE PRECISION NOT NULL,
	descripcion TEXT,
	"createdAt" time with time zone,
    "updatedAt" time with time zone,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS prueba_tecnica.inventarios (
	id SERIAL NOT NULL,
	"idProducto" INTEGER NOT NULL,
	stock INTEGER NOT NULL,
	"createdAt" time with time zone,
    "updatedAt" time with time zone,
	PRIMARY KEY (id),
	FOREIGN KEY ("idProducto") REFERENCES prueba_tecnica.productos (id)
);

CREATE TABLE IF NOT EXISTS prueba_tecnica.clientes (
	id SERIAL NOT NULL,
	nombre VARCHAR(100) NOT NULL,
	apellido VARCHAR(100) NOT NULL,
	correo VARCHAR(50) NOT NULL UNIQUE,
	cupo INTEGER NOT NULL,
	"createdAt" time with time zone,
    "updatedAt" time with time zone,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS prueba_tecnica.carritos (
	id SERIAL NOT NULL,
	"idCliente" INTEGER NOT NULL,
	PRIMARY KEY (id),
	"createdAt" time with time zone,
    "updatedAt" time with time zone,
	FOREIGN KEY ("idCliente") REFERENCES prueba_tecnica.clientes (id)
);

CREATE TABLE IF NOT EXISTS prueba_tecnica.producto_carritos (
	id SERIAL NOT NULL,
	"idProducto" INTEGER NOT NULL,
	"idCarrito" INTEGER NOT NULL,
	cantidad INTEGER NOT NULL,
	"createdAt" time with time zone,
    "updatedAt" time with time zone,
	PRIMARY KEY (id),
	FOREIGN KEY ("idProducto") REFERENCES prueba_tecnica.productos (id),
	FOREIGN KEY ("idCarrito") REFERENCES prueba_tecnica.carritos (id)
);

CREATE TABLE IF NOT EXISTS prueba_tecnica.ventas (
	id SERIAL NOT NULL,
	"idCliente" INTEGER NOT NULL,
	total DOUBLE PRECISION NOT NULL,
	"metodoDePago" TEXT NOT NULL,
	fecha DATE NOT NULL,
	"createdAt" time with time zone,
    "updatedAt" time with time zone,
	PRIMARY KEY (id),
	FOREIGN KEY ("idCliente") REFERENCES prueba_tecnica.clientes (id)
);

CREATE TABLE IF NOT EXISTS prueba_tecnica.producto_ventas (
	id SERIAL NOT NULL,
	"idProducto" INTEGER NOT NULL,
	"idVenta" INTEGER NOT NULL,
	cantidad INTEGER NOT NULL,
	"createdAt" time with time zone,
    "updatedAt" time with time zone,
	PRIMARY KEY (id),
	FOREIGN KEY ("idProducto") REFERENCES prueba_tecnica.productos (id),
	FOREIGN KEY ("idVenta") REFERENCES prueba_tecnica.ventas (id)
);


