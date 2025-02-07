const express = require("express");
const mongoose = require("mongoose");
const {dbConnect} = require("./db.js");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors())
dbConnect();

mongoose.connection.once("open", () => {
    console.log(`✅ Connected to database: ${mongoose.connection.name}`);
});


const detailsSchema = new mongoose.Schema({
    id : String,
    username : String,
    password : String,
    email : String,
    phone : String
});

const detailsModel = mongoose.model("login_details",detailsSchema);

//get login details

app.get("/login",async(req,res)=>{
        try{
            let data = await detailsModel.find();
            console.log(data);
            res.send(data);
        }
        catch(err){
            console.error("❌ Error fetching data:", err);
            res.status(500).send({ error: "Internal Server Error" });
        }
});


app.post("/register",async(req,res)=>{
    try{
        const data = req.body;
        console.log(data);
        let post = await detailsModel.create(data);
        res.send({
            message: "✅ Data inserted successfully into login_details",
            user: post
        });
    }
    catch (error) {
        console.error("❌ Error inserting data into marustunna:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
})


const locationSchema = new mongoose.Schema({
    from : String,
    to : String,
    travels : String,
    time: String,
    duration: String,
    time1: String,
    rating: String,
    price : String
})

const locationModel = mongoose.model("location",locationSchema,"location");
app.get("/location",async(req,res)=>{
    try{
        let data = await locationModel.find();
        console.log(data);
        res.send(data);
    }
    catch(err){
        console.error("❌ Error fetching data:", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
})

const paymentDetailsSchema = new mongoose.Schema({
    age: String,
    username: String,
    phone: String,
    email:String
})

const paymentModel = mongoose.model("payment_details",locationSchema);
// app.get("/payment",async(req,res)=>{
//     try{
//         let data = await paymentModel.find();
//         console.log(data);
//         res.send(data);
//     }
//     catch(err){
//         console.error("❌ Error fetching data:", err);
//         res.status(500).send({ error: "Internal Server Error" });
//     }
// })
app.post("/payment",async(req,res)=>{
    try{
        const data = req.body;
        console.log(data);
        let post = await paymentModel.create(data);
        res.send({
            message: "✅ Data inserted successfully into login_details",
            user: post
        });
    }
    catch (error) {
        console.error("❌ Error inserting data into marustunna:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
})
app.listen(port,()=>{
    console.log(`🚀 Server running at http://localhost:${port}`);
})