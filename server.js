const express = require('express')
const app = express()
const db = require('./db')

const menuItem = require('./modals/Menu')
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // req.body





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


app.listen(3000,()=>{
  console.log('server on')
})

