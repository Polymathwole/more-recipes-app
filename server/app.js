import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.set('port', parseInt(process.env.PORT, 10) || 8000);
app.disable('x-powered-by');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app);

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to More Recipes'
}));

app.all('*', (req, res) => res.sendStatus(404));

app.listen(app.get('port'),()=>console.log(`App listening on ${app.get('port')}`));

export default app;
