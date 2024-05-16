
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:["chef","waiter","manager"],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    }
   
})

personSchema.pre('save',async function(next){
const person = this
console.log("person before",person)
if(!person.isModified('password')){
    console.log("update without use of pre middleware")
    return next()
} 
try{

    console.log("hashing password on process")
    // hashed password generation
     
    // salt generation
    const salt = await bcrypt.genSalt(10)

    //hashed password
    const hashedPass = await bcrypt.hash(person.password,salt)
    person.password = hashedPass
    console.log("person after",person)
    next()
}catch(err){
    console.log("error while updating")
  return next(err)
}
})

personSchema.methods.comparePassword = async function(candidatePassword){
try{
    console.log(this)
const isMatch = await bcrypt.compare(candidatePassword,this.password) // this.password extract salt from the password stored in db ou current user
return isMatch
}catch(err){
throw(err)
}
}



const Person = mongoose.model('Person',personSchema)
module.exports = Person
// changes for reserch and development