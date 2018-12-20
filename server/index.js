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

  server.get('/aaaa', (req, res) => {
    return app.render(req, res, '/a', req.query);
  });

  server.get('/bbbb', (req, res) => {
    return app.render(req, res, '/b', req.query);
  });

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts', { id: req.params.id });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
