const mongoose = require('mongoose')

const mongoUrl = 'mongodb://localhost:27017/hotel'

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// moongose create default connection object which is responsible for all the interaction between node js and mongodb server
//here this object named as db

const db = mongoose.connection;

//add event listener

db.on('connected',()=>{
    console.log("Connected to mongodb server")
})

db.on('error',(err)=>{
    console.log("mongodb connection error",err)
})

db.on('disconnected',()=>{
    console.log("Mongodb disconnected")
})

// export  database connection
module.exports = db;