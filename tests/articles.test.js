const supertest = require('supertest');
const app = require('../src/app');

const request = supertest(app);

describe('GET /health', () => {
  test('responde con status ok', async () => {
    const res = await request.get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /articles', () => {
  test('responde con 200 y solo artículos publicados', async () => {
    const res = await request.get('/articles');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3);
    expect(res.body.every(a => a.published === true)).toBe(true);
  });
});

describe('GET /articles/:id', () => {
  test('devuelve el artículo correcto', async () => {
    const res = await request.get('/articles/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  test('404 si no existe', async () => {
    const res = await request.get('/articles/999');
    expect(res.status).toBe(404);
  });

  test('404 si no está publicado', async () => {
    const res = await request.get('/articles/3');
    expect(res.status).toBe(404);
  });
});
