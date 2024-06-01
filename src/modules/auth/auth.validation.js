import Joi from 'joi';

 export const signup ={
    body:Joi.object().required().keys({
        userName:Joi.string().min(3).max(15).required().messages({
            'any.required':'please send your name',
            'string.empty':'name is required'
        }),
        email:Joi.string().email().required(),
        password:Joi.string().pattern(new RegExp(/^[A-Z][a-z]{2,6}$/)).required(),
        cpassword:Joi.string().valid(Joi.ref('password')).required()
      
    })
}

export const signin ={
   body:Joi.object().required().keys({
    email:Joi.string().email().required().messages({
        'any.required':'please send your email'
    }),
    password:Joi.string().required()
   })
  
}
