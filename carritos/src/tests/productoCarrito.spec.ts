import request from 'supertest';
import { expressServer } from '../index';
import ExpressServer from '../expressServer';

const app = new ExpressServer().getApp();

describe('POST /api/carrito/productos', () => {
  // Test sin parametros en el body
  test('Debe responder con un status code 400', async () => {
    const response = await request(app).post('/api/carrito/productos/').send();
    expect(response.statusCode).toBe(400);
  });

  // Test con un parametro del body con un tipo que no corresponde
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .post('/api/carrito/productos/')
      .send({ idProducto: 'Hola mundo', idCarrito: 2, cantidad: 1 });
    expect(response.statusCode).toBe(400);
  });

  // Test con parametros que hacen falta en el body
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .post('/api/carrito/productos/')
      .send({ idProducto: 4, idCarrito: 2 });
    expect(response.statusCode).toBe(400);
  });

  // Test con peticion correcta de un producto que ya existe en el carrito
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .post('/api/carrito/productos/')
      .send({ idProducto: 2, idCarrito: 2, cantidad: 1 });
    expect(response.statusCode).toBe(400);
  });

  // Test con peticion correcta con una cantidad que sobrepasa el cupo de compra del cliente o el stock del producto
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .post('/api/carrito/productos/')
      .send({ idProducto: 4, idCarrito: 2, cantidad: 20 });
    expect(response.statusCode).toBe(400);
  });

  // Test con un id de producto que no existe
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .post('/api/carrito/productos/')
      .send({ idProducto: 30, idCarrito: 2, cantidad: 2 });
    expect(response.statusCode).toBe(400);
  });

  // Test con un id de carrito que no existe
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .post('/api/carrito/productos/')
      .send({ idProducto: 4, idCarrito: 40, cantidad: 2 });
    expect(response.statusCode).toBe(400);
  });

  // Test con peticion correcta
  test('Debe responder con un status code 201', async () => {
    const response = await request(app)
      .post('/api/carrito/productos/')
      .send({ idProducto: 4, idCarrito: 2, cantidad: 1 });
    expect(response.statusCode).toBe(201);
  });
});

describe('GET /api/carrito/productos/:id', () => {
  // Peticion correcta
  test('Debe responder con un status code 200', async () => {
    const response = await request(app).get('/api/carrito/productos/2').send();
    expect(response.statusCode).toBe(200);
  });

  // Retorno del objeto correspondiente al producto
  test('Debe responder con un Objeto Array de objetos correspondientes a los productos', async () => {
    const response = await request(app).get('/api/carrito/productos/2').send();
    expect(response.body).toBeInstanceOf(Array);
  });

  // Peticion con un id que no es de tipo numerico
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .get('/api/carrito/productos/true')
      .send();
    expect(response.statusCode).toBe(400);
  });

  // Peticion con un id que no existe
  test('Debe responder con un status code 404', async () => {
    const response = await request(app)
      .get('/api/carrito/productos/10000000')
      .send();
    expect(response.statusCode).toBe(404);
  });
});

describe('PUT /api/carrito/productos/:id', () => {
  // Peticion con un id que no existe
  test('Debe responder con un status code 404', async () => {
    const response = await request(app)
      .put('/api/carrito/productos/100000')
      .send({ cantidad: 3 });
    expect(response.statusCode).toBe(404);
  });

  // Peticion con un id que no es de tipo numerico
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .put('/api/carrito/productos/true')
      .send({ cantidad: 3 });
    expect(response.statusCode).toBe(400);
  });

  // Test sin ningun parametro del body
  test('Debe responder con un status code 400', async () => {
    const response = await request(app).put('/api/carrito/productos/3').send();
    expect(response.statusCode).toBe(400);
  });

  // Test con un parametro del body de un tipo que no corresponde
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .put('/api/carrito/productos/3')
      .send({ cantidad: 'Hola mundo' });
    expect(response.statusCode).toBe(400);
  });

  // Test peticion con una cantidad que supera el cupo de compra del cliente o el stock disponible del producto
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .put('/api/carrito/productos/3')
      .send({ cantidad: 100 });
    expect(response.statusCode).toBe(400);
  });

  // Test peticion correcta
  test('Debe responder con un status code 200', async () => {
    const response = await request(app)
      .put('/api/carrito/productos/3')
      .send({ cantidad: 3 });
    expect(response.statusCode).toBe(200);
  });
});

describe('DELETE /api/carrito/productos/:id', () => {
  // Peticion con un id de producto carrito que no existe
  test('Debe responder con un status code 404', async () => {
    const response = await request(app)
      .delete('/api/carrito/productos/1000')
      .send();
    expect(response.statusCode).toBe(404);
  });

  // Peticion con un id de producto carrito que no es de tipo numerico
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .delete('/api/carrito/productos/true')
      .send();
    expect(response.statusCode).toBe(400);
  });

  // Peticion correcta
  //   test('Debe responder con un status code 200', async () => {
  //     const response = await request(app)
  //       .delete('/api/carrito/productos/3')
  //       .send();
  //     expect(response.statusCode).toBe(200);
  //   });
});
