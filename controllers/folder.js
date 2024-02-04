"use strict";

const { logger } = require('../utils/logger')
const FILE_NAME = 'controllers/folder.js';
const Folder = require('../model/folder');
const fs = require('fs')

exports.uploadImageAndSave = async (req, res, next) => {
    try {
        logger(res?.locals?.reqId, FILE_NAME, "upload image start", req.body);

        console.log(req.files)
        const file = req.files[0]
         const image = new Folder({imageUrl: file.location})
           await image.save()

        
        res.send({ message:file.location })
    } catch (error) {
        console.log(error)
        next(error)
    }
}
exports.getAllImages = async (req, res, next) => {
    try {
        logger(res?.locals?.reqId, FILE_NAME, "getAllImages", req.body);

        let images = await Folder.find({})
        res.json({ images })
    } catch (error) {
        next(error)
    }
}

