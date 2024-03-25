"use strict";

const { logger } = require('../utils/logger')
const FILE_NAME = 'controllers/folder.js';
const Image = require('../model/image')
const Folder = require('../model/folder')
const {uploadFile,getObjectUrl} = require('../utils/s3')
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

        const imageKeys = await Image.find({folder:id,user:res.locals.user_id})
        let images=[]
         for(let img of imageKeys){
            images.push({uri: await getObjectUrl(img.imageKey)})
         }
        res.json({
            folder: folders,
            children: childFolder,
            images
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.uploadImageAndSave = async (req, res, next) => {
    try {
        logger(res?.locals?.reqId, FILE_NAME, "upload image start", req.body);

        const file = req.files['photos'][0]
        const fileExtension= file.originalname.split('.')[file.originalname.split('.').length-1]
        let fileName = `${res.locals.user_id}/${req.body.folderId}/${new Date().getTime()}.${fileExtension?fileExtension:'jpeg'}`
        
        await uploadFile(file.buffer,fileName,file.mimetype);
        logger(res?.locals?.reqId, FILE_NAME, "upload image middle", {});
        
        const imageLocation = new Image({ imageKey:fileName,folder:req.body.folderId,user:res.locals.user_id })
        await imageLocation.save()
        logger(res?.locals?.reqId, FILE_NAME, "upload image end", {});


        res.send('Image saved successfully')
    } catch (error) {
        console.log(error)
        next(error)
    }
}
exports.getAllImages = async (req, res, next) => {
    try {
        logger(res?.locals?.reqId, FILE_NAME, "getAllImages", req.params.id);
        const id = req.params.id
        const userId = res.locals.user_id

        const imageKeys = await Image.find({folder:id,user:userId})
        let images=[]
         for(let img of images){
            images.push({uri:getObjectUrl(img)})
         }
        res.json({ images })
    } catch (error) {
        next(error)
    }
}

