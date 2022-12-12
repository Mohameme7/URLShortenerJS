var express = require('express');
const sqlite3 = require('sqlite3')
var router = express.Router();
var crypto = require("crypto");
function RandomString() {
    return crypto.randomBytes(20).toString('hex');
}
let db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to The database');
});
router.get('/', function (req, res) {
    res.sendFile('index.html')
})
router.post('/create', function (req, res) {
    const url = req.body.url;
    try {
        new URL(url)
    }
    catch {
        res.status(400)
        res.send({"Error" : "Invalid URL"})
        return
    }
    var randomstring = RandomString()
    const query = "INSERT INTO urls(Code, RedirectsTo) values(?,?)";
    db.run(query, [randomstring, url])
    res.send({"ShortenedURL" : `http://localhost:3000/shortened/?code=${randomstring}`})
})


router.get('/shortened', function (req, res) {
    Code = req.query.code
    if(Code===undefined) {
        res.status(404)
        res.send("Invalid Request Query")
        return
    }
    const SQLQuery = "SELECT * FROM urls WHERE Code = ?"
    db.get(SQLQuery,[Code],(err, row) => {
        if(row===undefined) {
            res.send("Invalid Shorten Code")
            return
        }
        res.status(302)
        res.redirect(row.RedirectsTo)
    })
})
module.exports = router;
