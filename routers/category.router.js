const db = require("../connect");

module.exports = function (server) {
    server.get('/category', function (req, res) {
        db.query("SELECT * FROM category", function (err, data) {
            let message = null
            if (err) {
                message = err.sqlMessage
            } else {
                res.render('category', {
                    data: data   
                })
            }
        })
    });
    server.post('/category', function (req, res) {
        let formname = req.body.name
        let SQL = "SELECT * FROM category WHERE name like ?"
        db.query(SQL, [formname], function (err, data) {
            if (formname == 0) {
                res.redirect('/category')
            } else {
                res.render('category', {
                    data: data,
                    
                })
            }
        })
    });
    server.get('/category_delete/:id', function (req, res) {
        let id = req.params.id
        let sql = "DELETE FROM category WHERE id = ?"
        db.query(sql, [id], function (err, data) {
            
            let message = null
            if (err) {
                message = 'danh mục này đang có sản phẩm, nên không xoá được'
                res.render('category_error', { message })
            } else {
                res.redirect('/category')
            }
        })
    });
    server.get('/category_create', function (req, res) {
        
        res.render('category_create')
    });
    server.post('/category_create', function (req, res) {
        let fromData = req.body
        let sql = "INSERT INTO category SET ?"
        db.query(sql, [fromData], function (err, data) {
            if (!err) {
                res.redirect('/category')
            }
        })
    });
    server.get('/category_edit/:id', function (req, res) {
        let id = req.params.id
        let sql = "SELECT * FROM category WHERE id = ?"
        db.query(sql, [id], function (err, data) {
            
            res.render('category_edit', {
                data: data.length ? data[0] : null,
                
            })
        })
    });
    server.post('/category_edit/:id', function (req, res) {
        let fromData = req.body
        let id = req.params.id
        let sql = "UPDATE category SET ? WHERE id = ?"
        db.query(sql, [fromData, id], function (err, data) {
            if (!err) {
                res.redirect('/category')
            }
        })
    });
}
