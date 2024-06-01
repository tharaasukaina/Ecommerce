import mongoose from "mongoose";

const connectDB = async()=>{
     return await mongoose.connect(process.env.DBURL)
     .then(
    res=>{
        console.log("connected")
    }
     ).catch(
        err=>{
        console.log(`fail to connect db ....${err}`)

        }
     )
}

export default connectDB;