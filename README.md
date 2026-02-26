# 02 — Express: Fundamentos

## Objetivo

Migrar el servidor HTTP nativo del ejercicio anterior a Express y aprender sus conceptos clave: rutas, middlewares, manejo de errores y estructura de proyecto.

## Contexto

Seguimos construyendo la API del blog. Ahora usaremos Express para simplificar el código y añadir funcionalidades nuevas: logging, validación básica y manejo centralizado de errores.

## Tareas

### Tarea 1 — Migrar rutas a Express (`src/routes/articles.js`)
Implementa el router de Express con las mismas rutas que el ejercicio anterior:
- `GET /articles` → artículos publicados
- `GET /articles/:id` → artículo por id (404 si no existe o no está publicado)

### Tarea 2 — Middleware de logging (`src/middlewares/logger.js`)
Crea un middleware que imprima por consola cada request con el formato:
```
[2024-01-15 10:32:01] GET /articles 200 12ms
```
Debe registrar: fecha/hora, método, ruta, status code y tiempo de respuesta.

### Tarea 3 — Middleware de errores (`src/middlewares/errorHandler.js`)
Crea un middleware de manejo de errores (4 parámetros: `err, req, res, next`) que:
- Responda con el `status` del error si existe, o `500` por defecto
- Devuelva `{ error: err.message }`
- Imprima el stack del error por consola en desarrollo

### Tarea 4 — Ensamblar la app (`src/app.js`)
Une todo en la app de Express:
- Monta el middleware de logging
- Monta el middleware de `express.json()`
- Monta el router en `/`
- Añade una ruta `GET /health` que devuelva `{ status: "ok" }`
- Monta el manejador de errores al final

## Estructura esperada

```
02-express-basics/
├── data/
│   └── articles.json
├── src/
│   ├── routes/
│   │   └── articles.js       ← Tarea 1
│   ├── middlewares/
│   │   ├── logger.js          ← Tarea 2
│   │   └── errorHandler.js   ← Tarea 3
│   ├── app.js                 ← Tarea 4
│   └── server.js              ← ya implementado, no tocar
├── tests/
│   ├── articles.test.js
│   └── middlewares.test.js
└── package.json
```

## Cómo empezar

```bash
npm install
npm test
npm start
```

## Criterios de evaluación

- [ ] Todas las rutas devuelven el mismo comportamiento que en el ejercicio 01
- [ ] El logger imprime cada request con el formato correcto
- [ ] El error handler captura errores lanzados con `next(err)`
- [ ] `GET /health` responde `{ status: "ok" }`
- [ ] Los tests pasan
