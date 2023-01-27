import request from 'supertest';
import ExpressServer from '../expressServer';

const app = new ExpressServer().getApp();

describe('GET /api/venta', () => {
  // Peticion correcta
  test('Debe responder con un status code 200', async () => {
    const response = await request(app).get('/api/venta').send();
    expect(response.statusCode).toBe(200);
  });

  // Retorno del objeto correspondiente al venta
  test('Debe responder con un Objeto venta', async () => {
    const response = await request(app).get('/api/venta').send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('POST /api/venta', () => {
  // Peticion sin body
  test('Debe responder con un status code 400', async () => {
    const response = await request(app).post('/api/venta').send();
    expect(response.statusCode).toBe(400);
  });

  // Peticion con parametros del body faltantes
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .post('/api/venta')
      .send({
        idCliente: 2,
        fecha: '2023-01-24',
        productosVenta: [
          {
            idProducto: 2,
            cantidad: 1,
          },
          {
            idProducto: 3,
            cantidad: 3,
          },
        ],
      });
    expect(response.statusCode).toBe(400);
  });

  // Peticion con parametros del body de tipos que no corresponden
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .post('/api/venta')
      .send({
        idCliente: 'Hola mundo',
        total: true,
        metodoDePago: 'tarjeta',
        fecha: '2023-01-24',
        productosVenta: [
          {
            idProducto: 2,
            cantidad: 1,
          },
          {
            idProducto: 3,
            cantidad: 3,
          },
        ],
      });
    expect(response.statusCode).toBe(400);
  });

  // Peticion correcta
  test('Debe responder con un status code 200', async () => {
    const response = await request(app)
      .post('/api/venta')
      .send({
        idCliente: 2,
        total: 9898023,
        metodoDePago: 'tarjeta',
        fecha: '2023-01-27',
        productosVenta: [
          {
            idProducto: 2,
            cantidad: 1,
          },
          {
            idProducto: 3,
            cantidad: 3,
          },
        ],
      });
    expect(response.statusCode).toBe(200);
  });
});
