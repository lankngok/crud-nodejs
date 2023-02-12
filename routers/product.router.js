const db = require("../connect");

module.exports = function (server) {
    server.get('/product', function (req, res) {
        db.query("SELECT * FROM product", function (err, data) {
            res.render('product', {
                data: data
            })
        })
    });
    server.post('/product', function (req, res) {
        let formname = req.body.name
        let SQL = "SELECT * FROM product WHERE name like ?"
        db.query(SQL, [formname], function (err, data) {
            
            if (formname == 0) {
                res.redirect('/product')
            } else {
                res.render('product', {
                    data: data,
                    
                })
            }
        })
    });
    server.get('/product_delete/:id', function (req, res) {
        let id = req.params.id
        let sql = "DELETE FROM product WHERE id = ?"
        db.query(sql, [id], function (err, data) {
            if (!err) {
                res.redirect('/product')
            }
        })
    });
    server.get('/product_create', function (req, res) {
        db.query("SELECT * FROM category", function (err, data) {
            
            res.render('product_create', {
                data: data,
                
            })
        })

    });
    server.post('/product_create', function (req, res) {
        let fromData = req.body;
        let sql = "INSERT INTO product SET ?";
        db.query(sql, [fromData], function (err, data) {
            if (!err) {
                res.redirect('/product')
            }
        })
    });
    server.get('/product_edit/:id', function (req, res) {
        let id = req.params.id;
        let sql = "SELECT * FROM product WHERE id = ?";
        db.query(sql, [id], function (err, data) {
            
            res.render('product_edit', {
                data: data.length ? data[0] : null,
                
            })
        })
    });
    server.post('/product_edit/:id', function (req, res) {
        let fromData = req.body
        let id = req.params.id
        let sql = "UPDATE product SET ? WHERE id = ?"
        db.query(sql, [fromData, id], function (err, data) {
            if (!err) {
                res.redirect('/product')
            }
        })
    });
}