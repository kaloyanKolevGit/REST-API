const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('../config/config');
const cookieSecret = process.env.COOKIESECRET || 'SoftUni';
// const { errorHandler } = require('../utils')

module.exports = (app) => {
    app.use(express.json());

    app.use(cookieParser(cookieSecret));

    app.use(express.static(path.resolve(__basedir, 'static')));

    app.use(cors({
        origin: config.origin,
        credentials: true
      }));
    

    // app.use(errorHandler(err, req, res, next));
};
