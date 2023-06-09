const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');

const Message = require('../models/message');

function returnError(res, error) {
    res.status(500).json({
        message: 'An error occurred',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Message.find()
        .populate('sender')
        .then(messages => {
            res.status(200).json({
                message: 'Messages fetched successfully',
                messages: messages
            });

        })
        .catch(error => {
            returnError(res, error);
        });
}
);

router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");

    const message = new Message({
        id: maxMessageId,
        msgText: req.body.msgText,
        subject: req.body.subject
    });

    message.save()
        .then(createdMessage => {
            res.status(201).json({
                message: 'Message added successfully',
                newMessage: createdMessage
            });
        })
        .catch(error => {
            returnError(res, error);
        });
});

router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            message.subject = req.body.subject;
            message.msgText = req.body.msgText;

            Message.updateOne({ id: req.params.id }, message)
                .then(result => {
                    res.status(204).json({
                        message: 'Message updated successfully'
                    })
                })
                .catch(error => {
                    returnError(res, error);
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Message not found.',
                error: { message: 'Message not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            Message.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({ message: "Message deleted successfully" });
                })
                .catch(error => {
                    returnError(res, error);
                })
        })
        .catch(error => {
            returnError(res, error);
        });
});

module.exports = router;