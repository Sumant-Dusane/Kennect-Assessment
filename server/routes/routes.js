const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { encryptPassword, validateEncryption } = require('../utils/passwordEncryption');

const router = express.Router();

router.post('/signup', async(req, res) => {
    const {name, email, password} = req.body;
    const exists = await User.findOne({email});
    if(!name) {
        return res.send('User Name Required').status(500);
    }
    if(!email) {
        return res.send('Email Required').status(500);
    }
    if(!password) {
        return res.send('Password Required').status(500);
    }
    if(exists) {
        return res.send('User already exists').status(500);
    }
    const encryptedPassword = await encryptPassword(password);
    const user =  await User.create({
        name, 
        email, 
        password: encryptedPassword
    });
    return res.send('User Created: ' + user._id).status(200);
});

router.get('/login', async(req, res) => {
    const {name, password} = req.body;
    const user = await User.findOne({email});
    if(!name) {
        res.send('Name is Required').status(500);
    }
    if (!password) {
        res.send('Password is Required').status(500);
    }
    if(!user) {
        res.send('No User Found').status(404);
    }
    const match = await validateEncryption(password, user.password);
    if(match) {
        jwt.sign({
            email: user.email,
            id: user._id,
            name: user.name
        }, {err, token}, process.env.JWT_KEY, {}, (err, token) => {
            res.cookie('token', token).send(user).status(200);
        });
    } else {
        res.send('Invalid Credentials').status(504);
    }
})


module.exports = router;