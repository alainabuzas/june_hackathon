var express = require('express');
var router = express.Router();
var Guest = require('../models/guest');

//Route to create a new guest
router.post('/', (req, res) => {
    console.log(req.body)
    Guest.create(req.body, (err, guest) => {
        if (err) return res.status(500).send(err);
        res.send(guest);
    });
});

//Route to get guest by id
router.route('/:id').get((req, res) => {
    Guest.findBy
})

module.exports = router;
