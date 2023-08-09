const router = require('express').Router();
const users = require('./users');
const themes = require('./themes');
const posts = require('./posts');
const likes = require('./likes');
const test = require('./test');
const { authController } = require('../controllers');
const cors = require('cors')
const config = require('../config/config');

router.post('/register', authController.register);
router.options('/login', cors({
   origin: config.origin,
  credentials: true }))
router.post('/login', cors(), authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/themes', themes);
router.use('/posts', posts);
router.use('/likes', likes);
router.use('/test', test);

module.exports = router;
