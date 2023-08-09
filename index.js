global.__basedir = __dirname;
require('dotenv').config()
const dbConnector = require('./config/db');
// const mongoose = require('mongoose');
const apiRouter = require('./router');
// const config = require('./config/config');
const { errorHandler } = require('./utils');

dbConnector()
  .then(() => {
    const config = require('./config/config');

    const app = require('express')();
    require('./config/express')(app);

    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*")
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept Authorization"
      )
      if (req.method === "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "POST, PUT, PATCH, GET, DELETE"
        )
        return res.status(200).json({})
      }
      next()
    })

    app.use('/api', apiRouter);

    app.use(errorHandler);

    app.listen(config.port, console.log(`Listening on port ${config.port}!`));
  })
  .catch(console.error);