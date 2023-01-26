import request from 'supertest';
import { expressServer } from '../index';
import ExpressServer from '../expressServer';

const app = new ExpressServer().getApp();

describe('POST /api/carrito', () => {
  // Test sin parametros
  test('Debe responder con un status code 400', async () => {
    const response = await request(app).post('/api/carrito').send();
    expect(response.statusCode).toBe(400);
  });

  // Test con un parametro del un tipo que no corresponde
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .post('/api/carrito')
      .send({ idCliente: 'Hola mundo' });
    expect(response.statusCode).toBe(400);
  });

  // Test de una request correcta
  test('Debe responder con un status code 201', async () => {
    const response = await request(app)
      .post('/api/carrito')
      .send({ idCliente: 3 });
    expect(response.statusCode).toBe(201);
  });
});
