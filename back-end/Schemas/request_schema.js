import mongoose from "mongoose";

const requestSchema=new mongoose.Schema({
    request_usr: String,
    status: {type: String, default: "Pending"},
    request_date: {type: Date, default: Date.now()}
});

export default requestSchema;