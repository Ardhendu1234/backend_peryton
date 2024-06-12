import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app=express();

 app.use(cors({
    origin:true,
    credentials:true
 }))
 app.use(express.json()) //for limiting the json data incoming
 app.use(express.urlencoded({extended:true,limit:"16kb"}))  //for configuring the data coming from url
 app.use(express.static("public"))
 app.use(cookieParser()) //for accessing cookies through req  and setting the cookies in browser 


 import userRouter from "./routes/user.routes.js"
 import productRouter from "./routes/product.routes.js"
 import serviceRouter from "./routes/service.routes.js"
 import categoryRouter from './routes/category.routes.js';



//routes decalaration
app.use("/api/v1/users",userRouter)
app.use("/ecommerce",productRouter)
app.use("/service",serviceRouter)
app.use("/category",categoryRouter)

 export {app}