const express = require("express")

const app = express()
const logger = require("./middlewares/logger")
const articlesRoute = require("./routes/articles")
const errorHandler = require("./middlewares/errorHandler")
app.use(express.json())
app.use(logger)
app.use(articlesRoute)
// TODO: importar y montar middleware de logging 3
// TODO: montar express.json() -> check
// TODO: importar y montar el router de artículos 4
// TODO: añadir ruta GET /health 2
// TODO: importar y montar el manejador de errores 5

//middleware -> use -> get

app.get("/", (req, res, next) => {
  res.status(200).json({ status: "pagina principal funcionando" })
})

app.get("/health", (req, res, next) => {
  res.json({ status: "ok" })
})

app.use(errorHandler)

module.exports = app
