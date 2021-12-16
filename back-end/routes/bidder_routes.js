import express from "express";
import requestModel from "../models/request_model.js";
import userModel from "../models/user_model.js"

const router=express.Router();

router.post("/request",async function(req,res){
    try {
        const usr_req=req.body;
        const kt=await userModel.findByUsr_nm(usr_req.request_usr);
        if (kt==null || kt.usr_role!=="bidder")
            res.send("Can't make a request");
        else{
            const isExisted=await requestModel.findRequestByUser(usr_req.request_usr);
            if (isExisted && isExisted.status==="Pending"){
                res.send("User already requests");
            } else {
                const ret=await requestModel.addNewRequest(usr_req);
                if (ret==null)
                    res.send("Requested not successfully");
                else
                    res.send("Requested successfully"); 
            }
        }
         
    } catch (error) {
        console.log(error);
    }
    
});

router.patch("/update/myinfo",async function(req,res){
    try {
        const body=req.body;
        console.log("body: "+body.usr_dob);
        const filter={usr_nm:body.usr_nm};
        const update={};
        console.log("filter: "+filter);
        
        
        if (body.usr_fullname) update.usr_fullname=body.usr_fullname;
        if (body.usr_email) update.usr_fullname=body.usr_email;
        if (body.usr_dob) update.usr_dob=body.usr_dob;
        console.log("update: "+update);
        const ret=await userModel.updateInfo(filter,update);
        if (ret==null)
            res.send("Changed not successfully");
        else
            res.send("Changed successfully");    
    } catch (error) {
        console.log(error);
    }
    
});

export default router;