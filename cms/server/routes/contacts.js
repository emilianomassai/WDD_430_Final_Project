// Contacts Routes
const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');

const Contact = require('../models/contact');

function returnError(res, error) {
    res.status(500).json({
        message: 'An error occurred',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Contact.find()
        .populate('group')
        .then(contacts => {
            res.status(200).json({
                message: 'Contacts fetched successfully',
                contacts: contacts
            });
        })
        .catch(error => {
            returnError(res, error);
        });
}
);

router.get('/:id', (req, res, next) => {
    Contact.findOne({
        "id": req.params.id
    })
        .populate('group')
        .then(contact => {
            res.status(200).json({
                message: 'Contact fetched successfully',
                contact: contact
            });
        })
        .catch(error => {
            returnError(res, error);
        })
})

router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("contacts");

    const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        group: req.body.group
    });

    if (contact.group && contact.group.length > 0) {
        for (let groupContact of contact.group) {
            groupContact = groupContact._id;
        }
    }

    contact.save()
        .then(createdContact => {
            res.status(201).json({
                message: 'Contact added successfully',
                contact: createdContact
            });
        })
        .catch(error => {
            returnError(res, error);
        });
});

router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            contact.name = req.body.name;
            contact.email = req.body.email;
            contact.phone = req.body.phone;
            contact.imageUrl = req.body.imageUrl;
            contact.group = req.body.group;


            Contact.updateOne({ id: req.params.id }, contact)
                .then(result => {
                    res.status(204).json({
                        message: 'Contact updated successfully'
                    })
                })
                .catch(error => {
                    returnError(res, error);
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Contact not found.',
                error: { contact: 'Contact not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            Contact.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({ message: "Contact deleted successfully" });
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

