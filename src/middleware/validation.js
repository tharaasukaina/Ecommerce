 const methods =['body','params','headers','query','file'];
 let validationArray=[];
 export const validation=(schema)=>{ 
  return (req,res,next)=>{
    try{
      
     methods.forEach( key=>{
    if(schema[key]){

     const validationresult= schema[key].validate(req[key],{abortEarly:false});
     if(validationresult.error.details){
       validationArray.push(validationresult.error.details)
      }else{
      next()
    }
    }})

   if(validationArray.length >0){
     return res.status(400).json({message:"validation error",err:validationArray})
       validationArray=[];
   }
  }catch(error){
    return res.status(500).json({message:"catch error",error})
}
  
}
   }