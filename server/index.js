const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware');
const nextI18next = require('../i18n');

require('dotenv').config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  nextI18NextMiddleware(nextI18next, app, server);

  server.get('/', (req, res) => {
    return app.render(req, res, '/', req.query);
  });

  server.get('/login', (req, res) => {
    return app.render(req, res, '/login', req.query);
  });

  server.get('/profile', (req, res) => {
    return app.render(req, res, '/profile', req.query);
  });

  server.get('/products', (req, res) => {
    return app.render(req, res, '/products', req.query);
  });

  server.get('/products/:id', (req, res) => {
    return app.render(req, res, '/productDetails', { id: req.params.id });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
