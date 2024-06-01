
export const asyncHandler =(fn)=>{
     return (req,res,next)=>{
       fn(req,res,next).catch(
        error=>{
        //  return res.json({message:"catch error",err:error.message,stack:error.stack})
          return next(new Error(error,{}));     

        }
       )
     }
}