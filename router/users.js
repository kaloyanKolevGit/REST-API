const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

router.get('/profile', auth(),authController.getProfileInfo);
router.get('/my-listings/:userId', auth(), authController.getMyListings);
router.put('/profile', auth(),authController.editProfileInfo);

module.exports = router