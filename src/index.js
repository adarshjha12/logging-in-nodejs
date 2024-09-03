const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000 
const path = require('path')
const hbs = require('hbs')
const router = require('../routers/router')

const staticPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')

app.set('view engine', 'hbs')
app.set('views', viewPath)

app.use(express.static(staticPath))
app.use(router)


app.listen(PORT, () =>{
    console.log('server is running');
    
})