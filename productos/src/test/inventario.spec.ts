import request from 'supertest';
import ExpressServer from '../expressServer';


const app = new ExpressServer().getApp();

describe('GET /api/inventario', () => {
    // Peticion correcta
  test('Debe responder con un status code 200', async () => {
    const response = await request(app).get('/api/inventario').send();
    expect(response.statusCode).toBe(200);
  });

  // Peticion correcta veficando que responda un arreglo
  test('Debe responder con un arreglo de Inventarios', async () => {
    const response = await request(app).get('/api/inventario').send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /api/inventario/:id', () => {
  // Peticion correcta
  test('Debe responder con un status code 200', async () => {
    const response = await request(app).get('/api/inventario/1').send();
    expect(response.statusCode).toBe(200);
  });

  // Retorno del objeto correspondiente al inventario
  test('Debe responder con un Objeto Inventario', async () => {
    const response = await request(app).get('/api/inventario/1').send();
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('producto');
  });

  // Peticion un id que no es de tipo numerico
  test('Debe responder con un status code 400', async () => {
    const response = await request(app).get('/api/inventario/true').send();
    expect(response.statusCode).toBe(400);
  });

  // Peticion con un id que no existe
  test('Debe responder con un status code 404', async () => {
    const response = await request(app).get('/api/inventario/1000000').send();
    expect(response.statusCode).toBe(404);
  });
});

describe('POST /api/inventario', () => {
  // Test con un parametro faltante
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .post('/api/inventario')
      .send({ idProducto: 2 });
    expect(response.statusCode).toBe(400);
  });

  // Test con un parametro del un tipo que no corresponde
  test('Debe responder con un status code 400', async () => {
    const response = await request(app)
      .post('/api/inventario')
      .send({ idProducto: false, stock: 4 });
    expect(response.statusCode).toBe(400);
  });

  // Test de una request correcta
  test('Debe responder con un status code 201', async () => {
    const response = await request(app)
      .post('/api/inventario')
      .send({ idProducto: 4, stock: 8 });
    expect(response.statusCode).toBe(201);
  });
});
