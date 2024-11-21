import { Router } from "express";
import upload from "../config/multerConfig.js";

const mediaRoutes = Router()

mediaRoutes.post('/upload-video',upload.single('file'),async (req,res)=>{
    try {
        const result = req.file.path
        
        res.status(200).json({
            success:true,
            message:"File uploaded successfully",
            data:result
        })
    } catch (error) {
        console.log("Error in upload-video routes",error.message)
        res.status(500).json({message:"Internal server error"})        
    }
})

export default mediaRoutes