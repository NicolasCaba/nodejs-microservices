import request from 'supertest';
import ExpressServer from '../expressServer';

const app = new ExpressServer().getApp();

describe('GET /api/clientes', () => {
  // Peticion correcta
  test('Debe responder con un status code 200', async () => {
    const response = await request(app).get('/api/clientes').send();
    expect(response.statusCode).toBe(200);
  });

  // Peticion correcta veficando que responda un arreglo
  test('Debe responder con un arreglo de Clientes', async () => {
    const response = await request(app).get('/api/clientes').send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /api/clientes/:id', () => {
  // Peticion correcta
  test('Debe responder con un status code 200', async () => {
    const response = await request(app).get('/api/clientes/1').send();
    expect(response.statusCode).toBe(200);
  });

  // Retorno del objeto correspondiente al cliente
  test('Debe responder con un Objeto Inventario', async () => {
    const response = await request(app).get('/api/clientes/1').send();
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('correo');
    expect(response.body).toHaveProperty('cupo');
    expect(typeof response.body.cupo).toBe('number');
  });

  // Peticion un id que no es de tipo numerico
  test('Debe responder con un status code 400', async () => {
    const response = await request(app).get('/api/clientes/true').send();
    expect(response.statusCode).toBe(400);
  });

  // Peticion con un id que no existe
  test('Debe responder con un status code 404', async () => {
    const response = await request(app).get('/api/inventario/1000000').send();
    expect(response.statusCode).toBe(404);
  });
});
