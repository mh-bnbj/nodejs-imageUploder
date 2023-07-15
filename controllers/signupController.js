const User = require('../models/User')
const { validationResult } = require('express-validator')

const get = (req, res) => {
    res.render('signup', {
        flash: req.flash(),
        errors: [],
        URL: process.env.URL,
    })
}

const post = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('signup', {
            flash: req.flash(),
            errors: errors.array(),
            URL: process.env.URL,
        })
        return
    }

    const existanceUser = await User.findOne({
        where: {
            name: req.body.name,
        },
    })

    if (existanceUser) {
        req.flash('warning', 'This user already exists')
        res.render('signup', {
            flash: req.flash(),
            errors: [],
            URL: process.env.URL,
        })
        return
    }
    await User.create({
        name: req.body.name,
        password: await User.encryptPassword(req.body.password),
    })

    req.flash('success', 'user created successfully')
    res.redirect('/login')
}

module.exports = { get, post }
