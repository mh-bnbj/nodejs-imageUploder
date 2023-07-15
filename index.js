const express = require('express')

const mainRoute = require('./routes/mainRoute')

const app = express()
const PORT = 4000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/', mainRoute)

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})
