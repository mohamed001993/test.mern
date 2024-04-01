const isadmin=(req,res,next)=>{
  if(req.user.role=="admin"){
      next()
  }
  else{ res.send({msg:"is not Authorized"})
}}
module.exports= isadmin