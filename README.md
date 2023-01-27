# nodejs-microservices

Microservicios con Node.js

### Prerrequisitos
* Crear en cada uno de los microservicios un archivo .env en base al archivo .env.example

### Estructura de carpetas
* carritos -> *Microservicio carrito de compras*
* clientes -> *Microservicio clientes*
* productos -> *Microservicio productos*
* ventas -> *Microservicio ventas*
* sql -> *Codigó sql que usa la imagen de postgres en Docker para crear la base de datos y agregar datos a las tablas de productos y clientes*

Correr proyecto con docker compose

```
docker-compose build 
docker-compose up
```

Postman API Documentation: https://documenter.getpostman.com/view/18193262/2s8ZDeUyuA