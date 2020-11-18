/*--
Author: Sage Groupe
Date: 12-11-2020
FileName : app.js
*/


let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//let jwt = require('jsonwebtoken');

// create a reference to the model
let User = require('../models/user');

module.exports.displayLoginPage = (req, res, next) => {
    res.render('user-login', 
            {title: 'User Login', 
            displayName: req.user ? req.user.displayName : ''});   
}

module.exports.displayRegisterPage = (req, res, next) => {
    res.render('user-register', {title: 'Register', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processRegisterPage = (req, res, next) => {
    console.log('recieved the request....');
    console.log(req.body.title);
    console.log(req.body.subtitle);

    let newUser = User({
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "displayname": req.body.displayname
    });

    User.create(newUser, (err, User) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the list
            res.redirect('/survey-list');
        }
    });

}
