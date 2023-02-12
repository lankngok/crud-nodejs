const db = require("../connect");
const sestion = require('node-sessionstorage');

module.exports = function (server) {
    server.get('/', function (req, res) {
        res.render('home')
    });
    server.get('/about', function (req, res) {
        res.render('about')
    });
    
}