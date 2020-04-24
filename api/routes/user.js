const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

//signUp : saving user in db
router.post('/', (req, res) => {
    console.log('email : ' + req.body.email);
    console.log('firstName : ' + req.body.firstName);
    console.log('lastName : ' + req.body.lastName);
    console.log('password : ' + req.body.password);
    console.log('req : ' + req.toString());
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.status(409).json({'message': 'Mail exists'});
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        err => res.status(404).json({'error': err});
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email.toLowerCase(),
                            password: hash,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName
                        });
                        user.save((err) => {
                            if(err) {
                                res.status(500).json({'message':'User not saved!'});
                            }
                            else {
                                res.status(200).json({'message':'User saved!'});
                            }
                        });
                    }
                });
            }
        })
        .catch(err => res.status(404).json({'error': err}));
});

//signIn or In : authenticate the user
router.post('/signIn', (req, res) => {
    User.findOne({ email: req.body.email.toLowerCase()})
        .exec()
        .then(user => {

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) {
                    res.status(401).json({'message':'Auth Failed'});
                } else if(result) {
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    res.status(200).json({'message':'Auth Successful', 'token': token});
                } else {
                    res.status(401).json({'message':'Auth Failed'});
                }
            });
        })
        .catch(err => res.status(500).json({'error': err}));
});

router.get('/all', checkAuth, (req, res) => {
    User.find((err, result) => {
        if(err) {
            res.status(500).json({'message':'user not found!'});
        }
        else {
            res.status(200).json(result);
        }
    });
});

router.get('/byEmail', checkAuth, (req, res) => {
    User.findOne({ email: req.query.email}, (err, result) => {
        if(err) {
            res.status(500).json({'message':'user not found!'});
        }
        else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;