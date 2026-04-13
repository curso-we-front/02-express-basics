const express = require("express");
const path = require("path");
const fs = require("fs");
const { log } = require("console");

const router = express.Router();
const DATA_PATH = path.join(__dirname, "../../data/articles.json");

// Helper para leer artículos
function getArticles() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

// TODO: GET /articles — devuelve solo los publicados
router.get("/articles", (req, res, next) => {
  const articles = getArticles();
  const publishedArticles = articles.filter((article) => article.published);
  return res.json(publishedArticles);
});

// TODO: GET /articles/:id — devuelve el artículo por id si está publicado
router.get("/articles/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const articles = getArticles();
    const articleSought = articles.find((article) => article.id === id);
    if(!articleSought || !articleSought.published){
      return res.status(404).json({error: "Not found"})
    }
    return res.json(articleSought);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
