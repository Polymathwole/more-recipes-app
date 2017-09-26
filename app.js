const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./server/routes');

const app = express();

app.set('port', parseInt(process.env.PORT, 10) || 8000);

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (req, res) => res.status(200).json({
  message: 'Welcome to More Recipes'
}));

app.listen(app.get('port'),()=>console.log(`App listening on ${app.get('port')}`));