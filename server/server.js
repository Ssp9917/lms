import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './database/connectDB.js'
import userRouter from './routers/user.routes.js'
import categoryRouter from './routers/category.routes.js'
import courseRoutes from './routers/course.routes.js'
import mediaRoutes from './routers/media.routes.js'
import purchaseRoute from './routers/coursePurchase.routes.js'


// CONFIG ENVIOURMENT VARIABLE
dotenv.config({})

const app = express()
const PORT = 5002;

// CALL DATABASE
connectDB()

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static('uploads'));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));





// APIS
app.use('/user',userRouter);
app.use('/course',courseRoutes);
app.use('/category', categoryRouter);
app.use('/media',mediaRoutes);
app.use('/purchase',purchaseRoute)




app.get('/',(req,res)=>{
   res.status(200).send("lms Server started")
})

app.listen(PORT,()=>{
    console.log(`Server listen at port ${PORT}`)
})