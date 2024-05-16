const express = require('express')
const router = express.Router()
const Person = require('../modals/Person')

const{jwtMiddleware,generateJWT} = require('../jwt')

router.post('/signup',async(req,res)=>{
    try{
     
     const data = req.body;
     const newPerson = new Person(data)
     const response = await newPerson.save()

     const paylod = {
      username:response.username,
      id:response.id // we use .id instead ._id 
     }

     const token = generateJWT(paylod)
     
     res.status(200).json({response:response,token:token})
   
    }
    catch(err){
     res.status(500).json({error:"Internal server error"})
    }
  })


  router.post('/login',async(req,res)=>{
  try{
    const user = await Person.findOne(req.username)
    if(!user || await user.comparePassword(req.password)){
      return res.status(404).json({err:'user not found or password not match'})
    }

    //user matched(login) now we generate token

    const payload = {
      username:user.username,
      id:user.id
    }
    const token = generateJWT(payload)

    res.status(200).json({response:user,token:token})
   }catch(err){
    res.status(500).json({err:'internal server error'})
   }

  })


router.get('/',jwtMiddleware,async(req,res)=>{
    try{
     
     const data = await Person.find()
     res.status(200).json(data)
   
    }
    catch(err){
     res.status(500).json({error:"Internal server error"})
    }
   })


router.get('/profile',jwtMiddleware,async(req,res)=>{
  try{

    // we createed in userData key in req onject in jwtMiddleware where we insert payload
     const payload = req.userData

     const user = await Person.findOne({_id:payload.id})
     res.status(200).json(user)
  }catch(err){
    res.status(500).json({error:"Internal server error"})
  }
})
   
   // parameterised url
   
   router.get('/:workType',async(req,res)=>{
     try{
       const workType = req.params.workType
       if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
         const response = await Person.find({work:workType})
         res.status(200).json(response)
       }
       else{
         res.status(404).json({error:'invalid workType'})
       }
     }catch(err){
        res.status(500).json({error:'Internal server error'})
     }
   })

   router.put('/:id',async(req,res)=>{
    try{
      
      const documentId = req.params.id
      const updateData = req.body
      // const response = await Person.findByIdAndUpdate(documentId,updateData,{
      //   new:true,            //return updated data to response
      //   runValidators:true  // run mongoose validation
      // })
      let response = await Person.findById(documentId);
      
      if(!response){
        res.status(404).json({error:"not found"})
      }
      Object.assign(response, updateData);
      await response.save()
      res.status(200).json(response)
    }catch(err){
      res.status(500).json({error:'Internal server error'})
    }
   })

   router.delete('/:id',async (req,res)=>{
    try{
      const id = req.params.id
      const response = await Person.findByIdAndDelete(id)
      if(!response){
        res.status(404).json({error:"not found"})
      }
      res.status(200).json(response)
    }catch(err){
      res.status(500).json({error:'Internal server error'})
    }
   })

   module.exports = router