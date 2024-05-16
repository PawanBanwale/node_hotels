const express = require('express')
const app = express()
const db = require('./db')

const menuItem = require('./modals/Menu')

const bodyParser = require('body-parser') // it convert the json (coming from req body) to object
app.use(bodyParser.json()) // req.body

// middleware function
const logRequest = (req,res,next)=>{
console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`)
next() // move to next task
}
app.use(logRequest)

// authentication

const passport = require('./autj')
app.use(passport.initialize())

const localAuth = passport.authenticate('local',{session:false})


// dotenv
require('dotenv').config()
const Port = process.env.Port || 3000

app.get('/chicken',function(req,res){
res.send('thanks for ordering chicken')
})

app.get('/', function (req, res) {
  res.send('chal nikal lode')
})
//personRouter
const personRouter = require('./routers/personRouter')
app.use('/person',personRouter)

//menuRouter
const menuRouter = require('./routers/menuRouter')
app.use('/menu',menuRouter)


app.listen(Port,()=>{
  console.log('server on')
})


