const express = require('express')
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express()

app.use(express.static('public/public_html'))
app.use(express.static('public/public_css'))
app.use(express.static('public/public_js'))
app.use(express.static('assets/login'))
app.use(express.static('assets/home_page'))


app.get('/', function (req, res) {
  res.sendFile(__dirname + "/public/public_html/login.html")
});

app.listen(3000, function(){
  console.log('Server is running on port http://localhost:3000/')}
);