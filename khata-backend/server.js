require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const verifyToken = require('./middleware/verifyToken');
const app = express();
app.use(express.json());
app.use(cors());

const peopleRoutes = require("./routes/people");
app.use("/api/people", verifyToken,peopleRoutes);

const transactionRoutes = require("./routes/transaction");
app.use("/api/transactions", verifyToken,transactionRoutes);

const summaryRoutes = require("./routes/summary")
app.use(summaryRoutes);

const authRoutes = require("./routes/auth")
app.use(authRoutes)

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.error("Error connecting to MongoDB:", err));

app.get("/api/health",(req,res)=>{
    res.status(200).json({message:"Server is running fine!",status:"ok",dbStatus:mongoose.connection.readyState===1?"Connected":"Not Connected"})
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})