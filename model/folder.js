
const mongoose = require('mongoose')
const { Schema } = mongoose;

const folderSchema = new Schema({
    name: {
        type:String,
        default:'New folder'
    },
    status: {
        type: String,
        enum: ['root', 'bin', 'active'],
        default: 'active'
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Folder',
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }
})

module.exports = mongoose.model('Folder', folderSchema)