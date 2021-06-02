const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.userRegister = (req, res) => {
    let newUser = new User(req.body);

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        //hash is kept in the data base
        newUser.password = hash;

        newUser.save((error, user) => {
            if (error) {
                res.status(500);
                console.log(error);
                res.json({
                    message: "Server error."
                });
            } else {
            res.status(201);
            res.json({
                message: `The user ${user.name} has been cretaed`
                });
            }
        });
    });
}

exports.userLogin = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (error, user) => {
        // User not found
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Server error"
            });
        }
        // User is found
        else {
            const foundMatch = bcrypt.compareSync(req.body.password, user.password);
            if (user != null) {
                // Matching email and password
                if (user.email === req.body.email && foundMatch) {
                    jwt.sign({
                        user : {
                            id: user._id,
                            email: user.email,
                            role: user.role
                        }
                    }, process.env.JWT_KEY, {
                        expiresIn: "30 days"
                    }, (error, token) => {
                        if (error) {
                            res.status(500);
                            console.log(error);
                            res.json({
                                message: "Server error."
                            });
                        } else {
                            res.status(200);
                            res.json({
                                token
                            });
                        }
                    })
                } else {
                    res.status(403);
                    console.log(error);
                    res.json({
                        message: "Authentication failed"
                    });
                }
            }
            // Both email and password might not be valid
            else {
                res.status(403);
                console.log(error);
                res.json({
                    message: "Please check again your email and/or password"
                });
            }
        }
    });
}
