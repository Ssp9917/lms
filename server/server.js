import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './database/connectDB.js'
import userRouter from './routers/user.routes.js'


// CONFIG ENVIOURMENT VARIABLE
dotenv.config({})

const app = express()
const PORT = 5002;

// CALL DATABASE
connectDB()

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));





// APIS

app.use('/user',userRouter)




app.get('/',(req,res)=>{
   res.status(200).send("lms Server started")
})

app.listen(PORT,()=>{
    console.log(`Server listen at port ${PORT}`)
})