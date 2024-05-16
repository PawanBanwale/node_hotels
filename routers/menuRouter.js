const express = require('express')
const router = express.Router()
const menuItem = require('../modals/Menu')

router.get('/',async(req,res)=>{
try{
    console.log('Fetching menu items...');
    const data = await menuItem.find()
    console.log('Menu items fetched:', data);
    res.status(200).json(data)
}catch(err){
    console.error('Error fetching menu items:', err);
    res.status(500).json({err:"Internal server error"})
}    
})
router.post('/',async(req,res)=>{
try{

    const data = req.body
    const newMenu = new menuItem(data)
    const response = await newMenu.save()
    res.status(200).json(response)

    
}catch(err){
    res.status(500).json({err:"Internal server error"})
}    
})


// parameterised url
router.get('/:fruitTaste',async(req,res)=>{
    const fruitTaste = req.params.fruitTaste
    try{
      if(fruitTaste == 'sour' || fruitTaste == 'bitter' || fruitTaste == 'sweet'){
        const response = await menuItem.find({taste:fruitTaste})
        res.status(200).json(response)
      }else{
        res.status(404).json({error:"client side error"})
      }
    }catch(err){
    res.status(500).json({err:"Internal server error"})
    }
})
module.exports = router