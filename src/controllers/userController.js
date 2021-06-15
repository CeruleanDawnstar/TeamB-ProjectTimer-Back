const User = require('../models/userModel');
const mongoose = require('mongoose');
const Model = mongoose.model("User");
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

exports.getAllUsers = async (req, res) => {
    try{
        Model.find({}, (error, user) => {
            if (error) {
                console.log(error);
            } else{
                res.json(200);
                res.json(user);
            }
        })

    } catch (err){
        console.log(err);
    }
}

exports.getUserById = async (req, res) => {
    try{
        const user = req.params.id;

        await Model.findById({_id:user}, (err, res) => {
            if (err){
                console.log(err)
            } else{
                res.status(200);
                res.json(res)
            }
        })
    } catch (error){
        console.log(error)
    }
}

exports.updateUser = async (req, res) => {
    try{
        const find = {
            _id: req.user._id
        }

        const update = {
            username: req.body.username,
            email: req.body.email
        }

        Model.findOneAndUpdate(find, update, {new : true}, (error, updated) => {
            if (error){
                console.log(error)
            } else{
                res.status(200);
                res.json(updated)
            }
        })
    } catch(err){
        console.log(err)
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const find = {
            _id: req.user._id
        }

        Model.remove(find, (error) => {
            if (error){
                console.log(error)
            } else{
                res.status(200);
                res.json({"message" : "The user was deleted"})
            }
        })
    } catch(err){
        console.log(err)
    }
}

exports.logout = (req, res) => {
    res.status(200);
    res.json({"message" : "Logout successful"})
}

