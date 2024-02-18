"use strict";

const {logger} = require('../utils/logger')
const FILE_NAME = 'controllers/users.js'
const bcrypt = require('bcrypt');
const User = require('../model/users');
const {signToken} = require('../auth/auth')

exports.register =async (req, res, next) => {
    try {
        logger(res?.locals?.reqId, FILE_NAME, "register() start", req.body);
        req.body.password = await bcrypt.hash(req.body.password,10)
        await User.create(req.body)
        res.send({message:'User registered'})              
    } catch (error) {
        next(error)
    }
}

exports.login =async (req, res, next) => {
    try {
        logger(res?.locals?.reqId, FILE_NAME, "login() start", req.body);

        let userData = await User.findOne({_id:req.body.email});

        const match = await bcrypt.compare(req.body.password, userData.password);
        logger(res?.locals?.reqId, FILE_NAME, "login() middle", {match});
        if(!match){
            res.status(400).send('Invalid credentials')
        }
        let token = await signToken({id:userData._id})
        logger(res?.locals?.reqId, FILE_NAME, "login() end", {});

        res.send({message:'User logged in ',token})

    } catch (error) {
        next(error)
    }
}