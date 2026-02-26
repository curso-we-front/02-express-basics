const supertest = require('supertest');
const express = require('express');
const errorHandler = require('../src/middlewares/errorHandler');

describe('errorHandler middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.get('/error-500', (req, res, next) => {
      next(new Error('Error interno'));
    });
    app.get('/error-custom', (req, res, next) => {
      const err = new Error('No encontrado');
      err.status = 404;
      next(err);
    });
    app.use(errorHandler);
  });

  test('responde 500 por defecto', async () => {
    const res = await supertest(app).get('/error-500');
    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Error interno');
  });

  test('responde con el status del error si existe', async () => {
    const res = await supertest(app).get('/error-custom');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('No encontrado');
  });
});
