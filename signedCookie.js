var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()

app.use(cookieParser('somerandomkey'))

app.get('/', function (req, res) {
  if (req.signedCookies.visited) {

    console.log("cookies: ", req.cookies)
    console.log("signedCookies: ", req.signedCookies)

    res.send(JSON.stringify(req.signedCookies))
  } else {

    // https://www.npmjs.com/package/cookie
    res.cookie('visited', 1, {
        maxAge: 10 * 1000, //set round seconds
        signed: true, // set as signed cookie
        // expires: 0 // set expired date, 0 mean session cookie
    })
    res.send("Hello World (maybe expired).")
  }
})

app.listen(3000)