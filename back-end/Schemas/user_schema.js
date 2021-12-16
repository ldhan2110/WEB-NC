import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    usr_nm:String,
    usr_pw: String,
    usr_fullname:String,
    usr_email:String,
    usr_addr:String,
    usr_dob:String,
    active:{type:Boolean, default: true},
    otp:{type:String, default:null},
    created_time_otp: {type:Date, default: null},
    usr_role: {type:String, default:"bidder"}
});

export default userSchema;