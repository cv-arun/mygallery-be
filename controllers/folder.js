"use strict";

const { logger } = require('../utils/logger')
const FILE_NAME = 'controllers/folder.js';
const Image = require('../model/image')
const Folder = require('../model/folder')
const fs = require('fs');

exports.newFolder = async (req, res, next) => {
    try {
        logger(res?.locals?.reqId, FILE_NAME, "newFolder", req.body);

        await Folder.create({
            name: req.body.name,
            parent: req.body.parent,
            user: res.locals.user_id
        })

        res.send('folder created')

    } catch (error) {
        console.log(error)
        next(error)
    }
}
exports.getFolders = async (req, res, next) => {
    try {
        logger(res?.locals?.reqId, FILE_NAME, "get folder", req.params);

        let id = req.params.id
        let rootFolder = req.params.rootfolder
        let query = { _id: id }
        if (rootFolder=="true") {
            query = { status: 'root' }
        }

        let folders = await Folder.findOne({ ...query, user: res.locals.user_id })

        logger(res?.locals?.reqId, FILE_NAME, "get folder middle", { folders });
        if (rootFolder) {
            id = folders._id
        }
        let childFolder = await Folder.find({ parent: id, user: res.locals.user_id })
        res.json({
            folder: folders,
            children: childFolder
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.uploadImageAndSave = async (req, res, next) => {
    try {
        logger(res?.locals?.reqId, FILE_NAME, "upload image start", req.body);

        console.log(req.file, "---------------------------------")
        const file = req.file
        const imageLocation = new Image({ imageUrl: file.location })
        await imageLocation.save()


        res.send('file')
    } catch (error) {
        console.log(error)
        next(error)
    }
}
exports.getAllImages = async (req, res, next) => {
    try {
        logger(res?.locals?.reqId, FILE_NAME, "getAllImages", req.body);

        let images = await Image.find({})
        res.json({ images })
    } catch (error) {
        next(error)
    }
}

