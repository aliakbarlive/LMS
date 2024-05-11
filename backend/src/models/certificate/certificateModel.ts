import mongoose, { Schema } from "mongoose";

const certificateSchema:Schema = new Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps:true}) 

const Certificate = mongoose.model<any>("Certificate",certificateSchema)
export default Certificate