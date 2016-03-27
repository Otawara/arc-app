'use strict';

const express = require('express');
const route = express.Router();
const path = require('path');

// The Angular application Route
route.get('/Chatroom', (req, res) => {
	console.log(req.client.authorized + "\n");

    if(req.client.authorized) {
        console.log("request from: " + req.connection.getPeerCertificate().subject.CN + "\n");
    	res.sendFile(path.join(__dirname, '../public/apps/message/index.html'));
    }
    else {
    	res.sendFile(path.join(__dirname, '../public/apps/message/unauthorized.html'));
    }
});

module.exports = route;
