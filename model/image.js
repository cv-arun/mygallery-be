
const mongoose = require('mongoose')
const { Schema } = mongoose;

const folderSchema = new Schema({
    imageUrl: String
})

module.exports = mongoose.model('Image', folderSchema)