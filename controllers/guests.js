var express = require('express');
var Guest = require('../models/guest');
var router = express.Router();

//Route to create a new guest
router.post('/', (req,res)=>{
	console.log(req.body)
	Guest.create(req.body, (err, guest)=>{
		if (err) return res.status(500).send(err);
		res.send(guest);
	});
});

//Route to get guest by id
router.route('/:id').get((req,res)=>{

})

module.exports = router;
