/**
 * Middleware de logging.
 * Debe imprimir por consola cada request con el formato:
 * [YYYY-MM-DD HH:MM:SS] METHOD /ruta STATUS Xms
 *
 * Ejemplo: [2024-01-15 10:32:01] GET /articles 200 12ms
 *
 * Pista: para medir el tiempo, guarda Date.now() antes de
 * procesar y réstalo en el evento 'finish' de res.
 */

function logger(req, res, next) {
  // TODO: implementar
 const start = Date.now();

  res.on("finish", () => {
    const responseTime = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} ${responseTime}ms`);
  });

  next();
}

module.exports = logger;
