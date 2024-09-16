import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import catagoryRoute from './routes/CatagoryRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import cors from 'cors';

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app=express();

//middleware
app.use(cors()); 
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/catagory',catagoryRoute)
app.use('/api/v1/product',ProductRoute)



//port
const PORT=process.env.PORT ||4500 ;
app.listen(PORT,()=>{
    console.log(`server is running on ${process.env.DEV_MODE} at ${PORT} port`.bgGreen)
    
})   