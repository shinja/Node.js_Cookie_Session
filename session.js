var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var cookieParser = require('cookie-parser')

var app = express()

// https://github.com/expressjs/session
var sess = {
  secret: 'keyboard cat',
  resave: false,
  cookie: { //using cookie save sid.
    maxAge: 10 * 1000 // sync with session expire.
  }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies, need https-enabled.
}

app.use(session(sess))
app.use(cookieParser())

app.use(function (req, res, next) {
  var views = req.session.views

  if (!views) {
    views = req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  views[pathname] = (views[pathname] || 0) + 1

  next()
})

app.get('/foo', function (req, res, next) {
  console.log(req.cookies)
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function (req, res, next) {
  console.log(req.cookies)
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

app.listen(3000)