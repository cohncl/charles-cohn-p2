const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Contact = mongoose.model('Contacts');

router.get('/', (req, res) => {
    res.render("contact/addOrEdit",{
        viewTitle : "Insert Contact"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '') {
    insertRecord(req, res);
    } else {
    updateRecord(req, res);
    }
});

function updateRecord(req, res) {
    Contact.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
          res.redirect("contacts/list");
        } else {
          console.log(("Error during record update : " + err));
        }
    });    
};

function insertRecord(req, res) {
    var contact = new Contact();
    contact.fullName = req.body.fullName;
    contact.email = req.body.email;
    contact.mobile = req.body.mobile;
    contact.city = req.body.city;
    contact.save((err, doc) => {
        if (!err) {
            res.redirect('contacts/list');
        }
        else {
            console.log('Error during record insertion : ' + err);
        }
    });
};

router.get('/list', (req, res) => {
    Contact.find((err, docs) => {
        if (!err) {
            res.render("contact/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving contact list :' + err);
        }
    });
});

router.get('/:id', (req, res) => {
    Contact.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("contact/addOrEdit", {
                viewTitle: "Update Contact",
                contact: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/contacts/list');
        }
        else {
            console.log('Error in contact deletion : ' + err); 
        }
    });
});

module.exports = router;