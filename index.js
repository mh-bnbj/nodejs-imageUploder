require('dotenv').config({
    path: 'variables.env',
})

const express = require('express')
const errorHandler = require('./helpers/errorHandler')
const mainRoute = require('./routes/mainRoute')

const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

const app = express()
const PORT = process.env.PORT

// add passport codes
require('./helpers/passport')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())
// for parse request body that forms
app.use(express.urlencoded())

app.use(cookieParser())
app.use(session({ secret: process.env.SESSION_SECRET_KEY }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/', mainRoute)

app.use(errorHandler.handler404)
app.use(errorHandler.handlerServerErrors)

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})
