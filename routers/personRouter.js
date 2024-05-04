const express = require('express')
const router = express.Router()
const Person = require('../modals/Person')

router.post('/',async(req,res)=>{
    try{
     
     const data = req.body;
     const newPerson = new Person(data)
     const response = await newPerson.save()
     
     res.status(200).json(response)
   
    }
    catch(err){
     res.status(500).json({error:"Internal server error"})
    }
  })


router.get('/',async(req,res)=>{
    try{
     
     const data = await Person.find()
     res.status(200).json(data)
   
    }
    catch(err){
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
      const response = await Person.findByIdAndUpdate(documentId,updateData,{
        new:true,            //return updated data to response
        runValidators:true  // run mongoose validation
      })
      if(!response){
        res.status(404).json({error:"not found"})
      }

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