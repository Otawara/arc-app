'use strict';

const express = require('express');
const route = express.Router();

const messageController = require('./message.controller');

route.get('/messages/', messageController.getMessages);

route.get('/messages/:id', messageController.getMessageById);

route.post('/messages/', messageController.newMessage);

route.put('/messages/:id', messageController.updateMessage);

route.delete('/messages/:id', messageController.deleteMessage);

route.get('/messages-authors', messageController.getMessageAuthors);


module.exports = route;
