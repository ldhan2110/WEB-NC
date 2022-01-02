import express from "express";
import userModel from "../models/user_model.js";
import requestModel from "../models/request_model.js";


const router=express.Router();

router.get("/users",async function(req,res){
    try {
        const listUsers=await userModel.findAll();
        res.send(listUsers);
    } catch (error) {
        res.send(error);
    }
});

router.get("/sellers",async function(req,res){
    try{
        const listSellers=await userModel.findAllByRole("seller");
        res.send(listSellers);
    } catch (error) {
        res.send(error);
    }
});

router.get("/bidders",async function(req,res){
    try {
        const listBidders=await userModel.findAllByRole("bidder");
        res.send(listBidders);
    } catch (error) {
        res.send(error);
    }
});

router.get("/requests",async function(req,res){
    try {
        const listRequests=await requestModel.getRequests();
        res.send(listRequests);
    } catch (error) {
        res.send(error);
    }
});

router.get("/users/:usr_nm",async function (req,res){
    try{
        const usr_nm=req.params.usr_nm;
        const ret=await userModel.findByUsr_nm(usr_nm);
        if (ret)
            res.send(ret);
        else
            res.send("Nothing found!");
    } catch (error) {
        console.log(error);
    }
});

/*
router.get("/adm/search",async function(req,res){
    try{
        const userId=req.query.id;
        res.send(await user_model.findById(userId));
    } catch (err){
        res.send(err);
    }
});
*/

router.post("/insert",async function (req,res){
    try{
        const usrInfo=req.body;
        res.send(await UserModule.addNewUser(usrInfo));
    } catch (error) {
        res.send(error);
    }
});

router.patch("/upgrade/:req_id",async function (req,res){
    try {
        const id=req.params.req_id;
        const ret=await requestModel.findById(id);
        if (ret){
            console.log(ret.status);
            if (ret.status==="Pending") {
                const usr_nm=ret.request_usr;
                const ret2=await requestModel.changeStatus(id,"Approved");
                if (ret2){
                    const ret3=await userModel.updateRole(usr_nm,"seller");
                    if (ret3)
                        res.send("Success!");
                    else
                        res.send("Fail 2")
                } else
                    res.send("Fail 1");                
            } else
                res.send("Request that already handled");
            
        }
        else
            res.send("Can't find upgrade request with user "+usr_nm);
    } catch (error) {
        console.log(error);
    }
});

router.patch("/degrade/:usr_nm",async function (req,res){
    try {
        const usr_nm=req.params.usr_nm;
        const ret=await userModel.findByUsr_nm(usr_nm);
        if (ret){
            if (ret.usr_role==="seller"){
                const ret2=await userModel.updateRole(usr_nm,"bidder");
                if (ret2)
                    res.send("Degrade successfully");
                else
                    res.send("Degrade unsuccessfully");
            }
        }
    } catch (error) {
        console.log(error);
    }
});


router.patch("/info",async function(req,res){
    try {
        const body=req.body;
        const filter={usr_nm:body.usr_nm};
        const update={};
        if (body.usr_fullname) update.usr_fullname=body.usr_fullname;
        if (body.usr_email) update.usr_fullname=body.usr_email;
        if (body.usr_dob) update.usr_dob=body.usr_body;

        const ret=await userModel.updateInfo(filter,update);
        if (ret==null)
            res.send("Changed not successfully");
        else
            res.send("Changed successfully");    
    } catch (error) {
        console.log(error);
    }
});

router.delete("/delete",async function (req,res){

});

router.get("/categories",async function (req,res){
    const ret=await categoryModel.findAll();
    if (ret==null)
        res.send("OH snap!");
    else
        res.send(ret);
});

export default router;