import "dotenv/config"
import express from "express"
import  userRouter from "./router/userRoute"
import contentRouter from "./router/contentRoute"
import linkRouter from "./router/linkRoute"
import connectToDb from "./utils/db"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
const PORT = process.env.PORT

// Middleware
app.use(express.json()); // optional: to parse JSON request bodies
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials : true
}))

//User Signup, SignIn ROUTE
app.use("/api/v1", userRouter)
app.use("/api/v1", contentRouter)
app.use("/api/v1", linkRouter)


app.listen(PORT, () => {
    console.log("Sever is running at port " + PORT) 
    connectToDb()
})