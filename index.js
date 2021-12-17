// const express = require('express')
// const path = require('path')

// const app = express()

// app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

// app.use(require('./routes'))

// require('./db').connect(() => app.listen(3000))



const { promp } = require ('inquirer')
const logo = require ('asciiart-logo')
const db = require ('./db')
require ('console.table')