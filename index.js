var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();

var secret = process.env.JWT_SECRET;
var myId = process.env.USER_ID;

var mongoose = require('mongoose');
var User = require('./models/user');
mongoose.connect('mongodb://localhost/bbqueue'); //change to db want to use
app.use(require('morgan')('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/api/users', expressJWT({ secret: secret })
//     .unless({ path: ['/api/users'], method: 'POST' }));

app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ message: 'You need an authorization token to view this information.' });
    }
});



app.use('/api/users', require('./controllers/users'));
app.use('/api/events', require('./controllers/events'));
// app.use('/api/guests', require('./controllers/guests'));
// app.use('/api/items', require('./controllers/items'));



app.post('/api/auth', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err || !user) return res.status(401).send({ message: 'User not found' });
        user.authenticated(req.body.password, function(err, result) {
            if (err || !result) return res.status(401).send({ message: 'User not authenticated' });

            var token = jwt.sign(JSON.stringify(user), secret);
            res.send(token);
        });
    });
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000);
