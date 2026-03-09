const express = require("express")
const path = require("path")
const fs = require("fs")

const router = express.Router()
const DATA_PATH = path.join(__dirname, "../../data/articles.json")

function getArticles() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8")
  return JSON.parse(raw)
}

router.get("/articles", (req, res, next) => {
  try {
    const articles = getArticles()
    const published = articles.filter((article) => article.published)
    res.json(published)
  } catch (error) {
    next(error)
  }
});

router.get("/articles/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id)

    const articles = getArticles()
    const article = articles.find(
      (article) => article.id === id && article.published,
    )

    if (!article) {
      return res.status(404).json({ error: "Artículo no encontrado" })
    }
    res.json(article)
  } catch (error) {
    next(error);
  }
});

module.exports = router;
