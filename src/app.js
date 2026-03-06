const express = require('express');

const app = express();

// TODO: importar y montar middleware de logging
const logger = require('./middlewares/logger')
app.use(logger)

// TODO: montar express.json()
app.use(express.json());

// TODO: importar y montar el router de artículos
const articlesRouter = require('./routes/articles');
app.use('/', articlesRouter);

// TODO: añadir ruta GET /health
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

// TODO: importar y montar el manejador de errores
const error = require('./middlewares/errorHandler')
app.use(error)

module.exports = app;
