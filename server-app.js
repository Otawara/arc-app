'use strict';

const express =require('express');
const swig = require('swig');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');

var https = require("https");
var http = require("http");

const Message = require('./models/message');

const app = express();

app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// This is where all the magic happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });

const port = process.env.PORT || 3400;

var options = {
  key: fs.readFileSync("ssl/server/keys/localhost.key"),
  cert: fs.readFileSync("ssl/server/certificates/localhost.crt"),
  ca: fs.readFileSync("ssl/ca/ca.crt"),
  requestCert: true,
  rejectUnauthorized: false,
  passphrase: 'serverpass'
};

/*app.get('/', (req, res, next) => {

    let limit = req.body.limit || 0;

    Citation.find({}).limit(limit).exec((err, citations)  => {
        if(err) {
            return res.rend('index', {
                error: err.message
            });
            //return res.send({message: err.message});
        }
        //return res.send(citations);
        return res.render('index', {
            proverbes: citations
        });
    });
});*/

// API Chatroom
app.use('/api/v1/', require('./routes/api/message'));

app.use('/', require('./routes/static'));

/*app.listen(port, function(err) {
    if(err) console.error(err);
    else console.log(`The magic happen in http://localhost:${port}`);
});*/




/*http.createServer(app, function (err) {
    if(err) 
        console.error(err);
    else 
        console.log(`The magic happen in http://localhost:${port}`);
}).listen(port);*/

https.createServer(options, app, function (req, res) {
    if(err) 
        console.error(err);
    else 
        console.log(`The magic happen in http://localhost:${port}`);

    console.log(req.client.authorized + "\n");

        if(req.client.authorized) {
            console.log("request from: " + req.connection.getPeerCertificate().subject.CN + "\n");
        }
        else {
            console.log("status : denied" + "\n");
            console.log("You shall not pass !" + "\n");
        }
}).listen(55555);