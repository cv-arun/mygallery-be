
const mongoose = require('mongoose')
const { Schema } = mongoose;

const folderSchema = new Schema({
    imageKey: String,
    folder: {
        type: Schema.Types.ObjectId,
        ref: 'Folder',
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }
})

module.exports = mongoose.model('Image', folderSchema);