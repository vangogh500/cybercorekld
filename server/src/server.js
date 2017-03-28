var express = require('express')
var path = require('path')

var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var credentials = require('./credentials.js')
mongoose.connect(credentials.mongodb.url)

app.use(bodyParser.json())
app.use(express.static('../client/build'))

require('./routes.js')(app)

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'))
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
