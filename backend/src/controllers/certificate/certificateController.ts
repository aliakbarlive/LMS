import {Request,Response} from "express"
import Certificate from "../../models/certificate/certificateModel"

export const getCertificate = async(req:Request, res:Response)=>{
    const certificate = await Certificate.find()
    res.send(certificate)
}


export const addCertificate = async (req:Request,res:Response)=>{
const certificate = await Certificate.create(req.body)
res.status(201).json({success:true,message:"success fully Created"})
}