import express from "express";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import userModel from "../models/user_model.js";
import jwt from "jsonwebtoken";

const router=express.Router();

router.post("/auth/signin",async function(req,res){
    const usr_login=req.body;
    const ret=await userModel.findByUsr_nm(usr_login.usr_nm);
    if (ret==null)
        return res.status(401).json({
            error: "Invalid username",
        });
    if (!bcrypt.compareSync(usr_login.usr_pw,ret.usr_pw)){
        return res.status(401).json({
            error: "Invalid password"
        });
    }
    const opts={
        expiresIn: 3600000
    };
    const payload={
        userId:ret._id
    };

    const accessToken=jwt.sign(payload,"SECRET_KEY",opts);

    res.json({
        success: true,
        accessToken: accessToken
    });
});

router.post("/auth/signup",async function(req,res){
    try{
        const usr_registry=req.body;
        const existedEmail=await userModel.findByEmail(usr_registry.usr_email);
        if (existedEmail!=null){
            return res.json({
                message: "Email does exist"
            });
        }
        usr_registry.usr_pw=bcrypt.hashSync(usr_registry.usr_pw,10);
        const ret=await userModel.addNewUser(usr_registry);
        if (ret==null){
            return res.json({
                message:"Failed to add user"
            });
        }
        res.send(ret);
    } catch (err){
        console.log(err);
    }
});

router.post("/auth/forget",async function(req,res){
    const usr_email=req.body.usr_email;
    const ret=await userModel.findByEmail(usr_email);
    if (ret==null){
        return res.status(401).json({
            message: "Can't find email"
        });
    }

    const transporter=nodemailer.createTransport({
        service: "hotmail",
        auth:{
            user:"ndkhiem2702@outlook.com",
            pass:"billhsg@2018"
        }
    });

    var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

    const mailOptions={
        from: "ndkhiem2702@outlook.com",
        to: usr_email,
        subject:`Request to reset password from user ${usr_email}`,
        text: `Ma OTP de reset password: ${otp}`
    };

    res.send(await userModel.updateOTP(usr_email,otp));
    /*
    transporter.sendMail(mailOptions,async function(error,info){
        if (error){
            console.log(error);
            res.send("Error when sending mail");
        } else{
            res.send(await userModel.updateOTP(usr_email,otp));
            //res.send("Email sent successfully");
        }
    });
    */
});

router.post("/auth/reset",async function(req,res){
    const usr_newinfo=req.body;
    const ret=await userModel.findByUsr_nm(usr_newinfo.usr_nm);
    if (ret==null)
        res.json({
            error:"Can't find username"
        });

    if (ret.otp!=usr_newinfo.otp){
        res.json({
            error:"OTP does not match"
        });
    }
    var time=ret.created_time_otp.getTime();

    if (time+60000<Date.now()) {
        const tmp=await userModel.updateOTP(ret.usr_email,null);
        res.json({
            message:"OTP has expired"
        });
    } else {
        usr_newinfo.usr_pw=bcrypt.hashSync(usr_newinfo.usr_pw,10);
        res.send(await userModel.updatePass(usr_newinfo.usr_nm,usr_newinfo.usr_pw));
    }
});

export default router;