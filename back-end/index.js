import config from "config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
//import asyncError from "express-async-errors";
import UserModel from "./models/user_model.js";

var app=express();
var dbConn=await mongoose.connect(config.get("dbConfig.URI"));
//console.log(dbConn);
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


import authRouter from "./routes/auth_routes.js";
import adminRouter from "./routes/admin_routes.js";
import bidderRouter from "./routes/bidder_routes.js";

app.use("/",authRouter);
app.use("/admin",adminRouter);
app.use("/bidder",bidderRouter);

app.get("/err",function (req,res) {
    throw new Error("Error!");
});

app.use(function (req,res,next){
    res.status(404).json({
        error:"Endpoint not found"
    });
});

app.use(function (err,req,res,next){
    console.log(err.stack);
    res.status(500).json({
        error:"Something broke"
    });
});


const PORT = process.env.PORT || config.get("server.PORT");
var server = app.listen(PORT,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log(`App is working at http://${host}/${port}`);
});