import request from 'supertest';
import ExpressServer from '../expressServer';

const app = new ExpressServer().getApp();

describe('GET /api/producto/:id', () => {
  // Peticion correcta
  test('Debe responder con un status code 200', async () => {
    const response = await request(app).get('/api/producto/1').send();
    expect(response.statusCode).toBe(200);
  });

  // Retorno del objeto correspondiente al producto
  test('Debe responder con un Objeto Producto', async () => {
    const response = await request(app).get('/api/producto/1').send();
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('inventario');
  });

  // Peticion un id que no es de tipo numerico
  test('Debe responder con un status code 400', async () => {
    const response = await request(app).get('/api/producto/true').send();
    expect(response.statusCode).toBe(400);
  });

  // Peticion con un id que no existe
  test('Debe responder con un status code 404', async () => {
    const response = await request(app).get('/api/producto/1000000').send();
    expect(response.statusCode).toBe(404);
  });
});
