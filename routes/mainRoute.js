const express = require('express')
const router = express.Router()

const { check } = require('express-validator')

const homepageController = require('../controllers/homepageController')
const searchController = require('../controllers/searchController')
const deleteController = require('../controllers/deleteController')
const { isLoggedIn, isNotLoggedIn } = require('../helpers/auth')
const loginController = require('../controllers/loginController')
const signupController = require('../controllers/signupController')
const logoutController = require('../controllers/logoutController')
const uploadController = require('../controllers/uploadController')
const upload = require('../helpers/multer')
const sharp = require('sharp')
const fs = require('fs')

router.get('/', isLoggedIn, homepageController)
router.get('/search', isLoggedIn, searchController)

router.get('/login', isNotLoggedIn, loginController.get)
router.post('/login', isNotLoggedIn, check('name').notEmpty().trim(), loginController.post)

router.get('/signup', isNotLoggedIn, signupController.get)
router.post('/signup', isNotLoggedIn, check('name').not().isEmpty().trim(), check('password').isLength({ min: 6 }), signupController.post)

router.get('/logout', logoutController)

router.post(
    '/upload',
    upload.single('image'),
    async (req, res, next) => {
        await sharp(req.file.path).resize(500).toFile(`public/uploads/${req.file.filename}`)
        fs.unlinkSync(req.file.path)
        next()
    },
    uploadController.post
)

router.get('/deleteImage', deleteController)

module.exports = router
