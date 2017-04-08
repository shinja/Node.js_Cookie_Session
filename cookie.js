var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()

app.use(cookieParser())

app.get('/', function (req, res) {
  if (req.cookies.visited) {
    console.log(req.cookies)
    res.send(JSON.stringify(req.cookies))
  } else {

    // https://www.npmjs.com/package/cookie
    res.cookie('visited', 1, {
        maxAge: 10 * 1000, //set round down seconds
        // httpOnly: true,
        // expires: 0 // set expired date, 0 mean session cookie
    })
    res.send("Hello World (maybe expired).")
  }
})

app.listen(3000)