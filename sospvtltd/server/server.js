import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./config/db.js"

import jobRoutes from "./routes/jobRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import applicationRoutes from "./routes/applicationRoutes.js"

dotenv.config()

connectDB()

const app = express()

// ALLOW ALL ORIGINS
app.use(cors({
origin:"*",
methods:["GET","POST","PUT","DELETE"],
allowedHeaders:["Content-Type","Authorization"]
}))

app.use(express.json())

app.use("/api/jobs",jobRoutes)
app.use("/api/contact",contactRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/application",applicationRoutes)

app.get("/",(req,res)=>{
res.send("SOS Backend Running")
})

const PORT = process.env.PORT || 8000

app.listen(PORT,"0.0.0.0",()=>{
console.log(`Server running on port ${PORT}`)
})