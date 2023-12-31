global.__basedir = __dirname;
require('dotenv').config()
const dbConnector = require('./config/db');
// const mongoose = require('mongoose');
const apiRouter = require('./router');
// const config = require('./config/config');
const { errorHandler } = require('./utils');
const cors = require('cors')

dbConnector()
  .then(() => {
    const config = require('./config/config');

    const app = require('express')();
    require('./config/express')(app);

    const corsOptions = {
      origin: 'https://findyourdreamcar.000webhostapp.com',
      credentials: true
    };
    
    app.use(cors(corsOptions));

    app.use('/api', apiRouter);

    app.use(errorHandler);

    app.listen(config.port, console.log(`Listening on port ${config.port}!`));
  })
  .catch(console.error);