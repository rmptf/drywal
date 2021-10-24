if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

const express = require('express')
const app = express()
const expressLayouts =  require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useUnifiedTopology: true,
  })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

const indexRouter = require('./routes/index')
const webstoreRouter = require('./routes/webstore')
const twodcad = require('./routes/twodcad')

app.use('/', indexRouter)
app.use('/webstore', webstoreRouter)
app.use('/twodcad', twodcad)

app.listen(process.env.PORT || 3000)
