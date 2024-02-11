
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
        default:'65bf568ba440c9edf7f8cacb'
    }
})

module.exports = mongoose.model('Folder', folderSchema)