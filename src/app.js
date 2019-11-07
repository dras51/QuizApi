import express from 'express';
import fs from 'fs';
import compression from 'compression'; // compresses requests
import session from 'express-session';
import bodyParser from 'body-parser';
import lusca from 'lusca';
import mongo from 'connect-mongo';
import flash from 'express-flash';
import path from 'path';
import mongoose from 'mongoose';
import passport from 'passport';
import bluebird from 'bluebird';
import { MONGODB_URI, SESSION_SECRET } from './util/secrets';
import apiRoutes from './api-routes';
import AppError from './util/appError';
import globalErrorHandler from './util/errorController';

const MongoStore = mongo(session);

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log('connection to mongoUrl was successful');
  })
  .catch(err => {
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    // process.exit();
  });

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      url: mongoUrl,
      autoReconnect: true
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/**
 * Primary app routes.
 */

app.get('/', async (req, res) => {
  const getApiVersion = resp => {
    fs.readFile(path.resolve(__dirname, '../package.json'), (err, data) => {
      if (err) throw err;
      const packageJson = JSON.parse(data.toString());
      const { version } = packageJson;
      resp.status(200).send(`Api Version - ${version}`);
    });
  };
  getApiVersion(res);
});

app.use('/api/v1', apiRoutes);

app.all('*', (req, res, next) => {
  // const err = new Error(`can't find ${req.originalUrl} on this Srerver`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`can't find ${req.originalUrl} on this Srerver`, 404));
});

app.use(globalErrorHandler);

export default app;
