"use strict";

const {logger} = require('../utils/logger')
const FILE_NAME = 'controllers/users.js'

exports.register = (req, res, next) => {
    try {
        logger(res?.locals?.reqId, FILE_NAME, "register() start", req.body);
        res.send({message:'register route is here'})              
    } catch (error) {
        next(error)
    }
}

exports.login = (req, res, next) => {
    try {
        logger(res?.locals?.reqId, FILE_NAME, "login() start", req.body);
        res.send({message:'Login routes in here'})
    } catch (error) {
        next(error)
    }
}