const express = require("express")
const path = require("path")
const fs = require("fs")

const router = express.Router()
const DATA_PATH = path.join(__dirname, "../../data/articles.json")
console.log(DATA_PATH)

// Helper para leer artículos
function getArticles() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8")
  return JSON.parse(raw)
}

// TODO: GET /articles — devuelve solo los publicados
router.get("/articles", (req, res, next) => {
  const articles = getArticles()
  const articlesPublished = articles.filter((article) => article.published)
  res.status(200).json(articlesPublished)
  // implementar
})

// TODO: GET /articles/:id — devuelve el artículo por id si está publicado
router.get("/articles/:id", (req, res, next) => {
  const articles = getArticles()
  const id = Number(req.params.id)
  const idArticlesPublished = articles.find(
    (article) => article.published && article.id === id,
  )

  if (!idArticlesPublished) {
    const error = new Error(
      "Artículo no publicado, por favor, inténtelo de nuevo",
    )
    error.status = 404
    return next(error)
  }
  res.status(200).json(idArticlesPublished)
  // implementar
  // Usa next(error) para pasar errores al manejador central
})

module.exports = router
