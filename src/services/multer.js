import multer  from 'multer'

export const filevalidation ={
    image:['image/png','image/jpg'],
    pdf:['application/pdf']
}
export const HME =(err,req,res,next)=>{
 if(err){
   res.status(400).json({message:"multer error"})
 }
  else {
  next(); } 
 }
export function mymulter(customValidation) {
const storage = multer.diskStorage({})

  function fileFilter(req,file,cb){
    if(!customValidation.includes(file.mimetype)){
        cb("invalid format",false)
    }else{
        cb(null,true);
    }
  }
  const upload = multer({fileFilter,storage})
 return upload;
}