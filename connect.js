const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'bkap_test'
});

db.connect(function(err) {
    if (err) {
        throw new Error('Không thể kết nối CSDL crud_nodejs');
    }
});

module.exports = db;