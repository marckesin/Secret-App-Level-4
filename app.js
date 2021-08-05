require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

const dbConfig = require('./config/database.config').local;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  keepAlive: true,
  keepAliveInitialDelay: 30000
}).then(() => {
  console.log('Conectado ao banco de dados com sucesso.');
}).catch((err) => {
  console.log('Não foi possivel conectar ao banco de dados: ', err);
  process.exit();
});

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;