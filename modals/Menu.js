const mongoose = require('mongoose')

const newMenu = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        default:0,
        required:true
    },
    taste:{
      type:String,
      enum:["sour",'bitter','sweet']
    }

})
const menuItem = mongoose.model('menuItem',newMenu)
module.exports = menuItem