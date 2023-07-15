const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/User')

passport.initialize()
passport.use(
    new LocalStrategy(
        {
            usernameField: 'name',
            passwordField: 'password',
        },
        async (name, password, cb) => {
            const user = await User.findOne({
                where: {
                    name: name,
                },
            })
            try {
                if (!user) return cb(null, false, { message: 'Incorrect username.' })
                if (!User.validPassword(user, password)) return cb(null, false, { message: 'Incorrect password.' })
                return cb(null, user)
            } catch (err) {
                cb(err)
            }
        }
    )
)

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await User.findOne({
            where: {
                id: id,
            },
        })
        cb(null, user)
    } catch {
        cb(err, null)
    }
})
