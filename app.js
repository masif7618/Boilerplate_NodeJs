const path = require('path');
const express = require("express");
const app = express();
const morgan = require("morgan")

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require("./routes/userRoutes")


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// 3) ROUTES
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

app.use(globalErrorHandler);

module.exports = app;