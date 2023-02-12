const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const db = require('./connect')
const server = express();

server.set('view engine', 'ejs')
server.use(bodyParser.json())
server.use(express.static('public'))
server.use(bodyParser.urlencoded({ extended: true }));

//router 
require('./routers/home.router')(server)
require('./routers/category.router')(server)
require('./routers/product.router')(server);

server.listen(1000, function () {
    console.log('http://localhost:1000')
})