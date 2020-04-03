const express = require('express');
const router = express.Router(); 
const favicon = require('serve-favicon');
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
app.use('/hi', home);

app.get('*', (req, res) => {
  res.status(404).send('what???');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}.`);
});