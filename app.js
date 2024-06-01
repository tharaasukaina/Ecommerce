import express from 'express'
import dotenv from "dotenv"
import connectDB from './DB/connection.js';
import morgan from 'morgan'
dotenv.config({path:'./config/.env'})
import * as indexRouter from './src/modules/index.router.js'
const app = express()
const port = process.env.PORT
connectDB();
app.use(express.json())
if(process.env.MOOD=='DEV'){
 app.use(morgan('dev'))   
}

const baseurl=process.env.BASEURL
app.use(`${baseurl}auth`,indexRouter.authRouter)
app.use(`${baseurl}user`,indexRouter.userRouter)
app.use(`${baseurl}category`,indexRouter.categoryRouter)
app.use(`${baseurl}subcategory`,indexRouter.subcategoryRouter)
app.use(`${baseurl}brand`,indexRouter.brandRouter)
app.use(`${baseurl}product`,indexRouter.productRouter)
app.use(`${baseurl}coupon`,indexRouter.couponRouter)
app.use(`${baseurl}cart`,indexRouter.cartRouter)





app.use('*',(req,res)=>{
    res.status(404).json({message:"page not found"})
})
//error handling middleware
app.use( (err,req,res,next)=>{
    if(err){
        res.status(err['cause']).json({message:err.message,stack:err.stack})
    }
} )
app.listen(port, () => console.log(`Example app listening on port ${port}!`))