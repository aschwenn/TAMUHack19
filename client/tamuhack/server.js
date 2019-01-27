// Imports
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var prompt = require('prompt');
//var cors = require('cors');

console.log('Hello, World!');

// Initialize express server
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
/*app.use(cors({
    origin: 'http://localhost:8100/'
}));*/
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// HTTP request handlers
app.get('/', (req, res) => {
    console.log('Homepage visited.');
    res.send('Howdy!');
});
app.get('/courseQuery/', (req, res) => {
    res.send('test');
});

// Start server on port 8080
var port = 8080;
app.listen(port, () => {
    console.log('Server started on port ' + port);
    console.log('\n\n');
});