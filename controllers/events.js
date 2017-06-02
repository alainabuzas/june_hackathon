var express = require('express');
var Event = require('../models/event');
var User = require('../models/user');
var router = express.Router();

router.route('/')
    // Pretty sure we don't need a route to get ALL groups.  We should be
    // able to just render all the groups a user has based on the Group._id's
    // from their User schema.

    .get(function(req, res) {
        Event.find(function(err, events) {
            if (err) return res.status(500).send(err);
            res.send(events);
        });
    })
    // Route to create a new event and add that event to the current user
    // userEvents
    .post(function(req, res) {
        var userId = req.user.id;
        var eventTitle = req.body.name;
        var eventDate = req.body.date;
        Event.create({
            title: eventTitle,
            date: eventDate
        }, function(err, event) {
            if (err) return res.status(500).send(err);
            User.findByIdAndUpdate(userId, { $push: { userEvents: [event._id] } }, function(err) {
                if (err) return res.status(500).send(err);
            });
            res.send(event);
        });
    });


router.route('/:id')
    // Route to return an individual Event
    .get(function(req, res) {
        Event.findById(req.params.id, function(err, event) {
            if (err) return res.status(500).send(err);
            res.send(event);
        });
    })
    // Route to edit an individual Group
    .put(function(req, res) {
        Event.findByIdAndUpdate(req.params.id, req.body, function(err) {
            if (err) return res.status(500).send(err);
            res.send({ 'message': 'success' });
        });
    })
    // Route to delete an individual Group
    .delete(function(req, res) {
        Event.findByIdAndRemove(req.params.id, function(err) {
            if (err) return res.status(500).send(err);
            res.send({ 'message': 'success' });
        });
    });



module.exports = router;
