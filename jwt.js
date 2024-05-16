const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    const authorization = req.headers.authorization
    if(!authorization) return res.status(404).json({error:'Unauthorized bcz token not provided'})
       
        // token extract from authorization
        const token = req.headers.authorization.split(' ')[1]

        if(!token)return res.status(404).json({err:'Unauthorized'})

try{
            // verify the token
        const paylod = jwt.verify(token,process.env.JWT_SECRET) // it also return the payload of the token
      

      // creating a key in user object before reaching to next

      req.userData = paylod

      next()
    }catch(err){
        res.status(404).json({err:'Invalid token'})
    }
}

const generateJWT = (payload)=>{

    const token = jwt.sign(payload,process.env.JWT_SECRET)
    return token

}

module.exports = {jwtMiddleware,generateJWT}