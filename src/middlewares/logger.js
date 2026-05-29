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
  const time = Date.now()
  res.on("finish", () => {
    const timeResponse = `${new Date(Date.now()) - time}ms`
    const formattedCurrentDate = `${new Date(Date.now()).toLocaleString().replace(",", "")}`
    console.log(
      `${formattedCurrentDate} ${req.method} ${req.url} ${res.statusCode} ${timeResponse}`,
    )
  })
  next()
}

module.exports = logger
