'use strict';

const Message = require('../../../models/message');

// Get all Citations
exports.getMessages = (req, res) => {
    Message.find({}).exec((err, messages) => {
        if(err) {
            return res.send(500, {message: err.message});
        }

        return res.send(200, messages);
    });
};

// Get One message
exports.getMessageById = (req, res) => {
    let id = req.params.id;
    Message.findOne({_id: id}).exec((err, message) => {
        if(err) return res.send(500, {message: err.message});
        if(!message) return res.send(404, {message: 'Citation not found'});
        return res.send(200, message);
    });
};

// Create new message
exports.newMessage = (req, res) => {
    let author = req.body.author;
    let content = req.body.content;
    let time = req.body.time;

    if(!author || !content) {
        return res.send(402, {message: 'All fields are required'});
    } else {
        let message = new Message(req.body);

        message.save((err, message) => {
            if(err) return res.send(500, {message: err.message});

            return res.send(200, message);
        });
    }
};

// Update message
exports.updateMessage = (req, res) => {
    let id = req.params.id;

    Message.findOne({_id: id}).exec((err, message) => {
        if(err) return res.send(500, {message: err.message});
        if(!message) return res.send(404, {message: 'Message not found'});
        message.content = req.body.content || message.content;

        message.save((err, message) => {
            if(err) return res.send(500, {message: err.message});

            return res.send(200, message);
        });
    });
};

// Delete Proverb
exports.deleteMessage = (req, res) => {
    let id = req.params.id;

    Message.remove({_id: id}).exec((err, message) => {
        if(err)
            return res.send(500, {message: err.message});
        if(!message)
            return res.send(404, {message: 'Message not found'});
        return res.send(200, {message: 'Message has been deleted.'});
      
      //return res.send(200, message);
    });
};

// Get authors by messages
exports.getMessageAuthors = (req, res) => {
    Message.distinct('author', (err, authors) => {
        if(err) {
            return res.send(500, {message: err.message});
        }
        return res.send(200, authors);
    });
};
