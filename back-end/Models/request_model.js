import mongoose from "mongoose";
import requestSchema from "../schemas/request_schema.js";

const requestModel=mongoose.model("Requests",requestSchema,"Requests");

export default {

    addNewRequest: async function(usr_req){
        return await requestModel.create(usr_req);
    },
    
    getRequests: async function(){
        return await requestModel.find({});
    },

    findById: async function(id){
        return await requestModel.findById(id);
    },

    findRequestByUser: async function(usr_nm){
        return await requestModel.findOne({request_usr:usr_nm});
    },

    changeStatus: async function(id,newStatus){
        return await requestModel.findByIdAndUpdate(id,{status: newStatus});
        //return await requestModel.findOneAndUpdate({request_usr:usr_name},);
    }
};