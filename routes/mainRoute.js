const express = require('express')
const router = express.Router()

const { check } = require('express-validator')

const homepageController = require('../controllers/homepageController')
const { isLoggedIn, isNotLoggedIn } = require('../helpers/auth')
const loginController = require('../controllers/loginController')
const signupController = require('../controllers/signupController')
const logoutController = require('../controllers/logoutController')

router.get('/', isLoggedIn, homepageController)

router.get('/login', isNotLoggedIn, loginController.get)
router.post('/login', isNotLoggedIn, check('name').notEmpty().trim(), loginController.post)

router.get('/signup', isNotLoggedIn, signupController.get)
router.post('/signup', isNotLoggedIn, check('name').not().isEmpty().trim(), check('password').isLength({ min: 6 }), signupController.post)

router.get('/logout', logoutController)

module.exports = router
