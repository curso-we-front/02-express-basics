/**
 * Middleware de manejo de errores.
 * IMPORTANTE: debe tener exactamente 4 parámetros para que Express
 * lo reconozca como manejador de errores: (err, req, res, next)
 *
 * Comportamiento esperado:
 * - Usa err.status si existe, o 500 por defecto
 * - Responde con { error: err.message }
 * - Si NODE_ENV !== 'production', imprime err.stack por consola
 */

function errorHandler(err, req, res, next) {
  if (process.env.NODE_ENV !== "production") {
    console.log(err.stack);
  }
  if (!err.status) {
    return res.status(500).json({ error: err.message });
  }
  return res.status(err.status).json({ error: err.message });
}

module.exports = errorHandler;
