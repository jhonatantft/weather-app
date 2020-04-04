const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const mustache = mustacheExpress();
const home = require('./src/routes/home');

require('dotenv').config();

mustache.cache = null;
app.engine('mustache', mustache);
app.set('view engine', 'mustache')
app.set('views', __dirname + '/src/views');
app.use(express.static('public'));

app.use('/', home);

app.get('*', (req, res) => {
  res.status(404).send('<div style="text-align: center; margin: 5em; font-size: 2em;"><h1>404 <div>There is nothing here!<div></h1></div>');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}.`);
});