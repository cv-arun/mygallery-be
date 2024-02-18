
const mongoose = require('mongoose')
const { Schema } = mongoose;

const folderSchema = new Schema({
    name: {
        type:String,
        requred:true
    },
    email: {
        type:String,
        requred:true
    },
    password:{
        type:String,
        required:true
    }
   
})

module.exports = mongoose.model('Users', folderSchema)