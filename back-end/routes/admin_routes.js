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


router.post("/category/add",async function(req,res){
    const body=req.body;
    const ret=await categoryModel.addNewCategory(body);
    if (ret==null)
        res.send("OOPS! Can't add new category");
    else
        res.send("New category has been added");
});

router.post("/category/subcategory/add",async function (req,res){
    const category=req.body.category;
    const subcategory=req.body.subcategory;
    const ret=await categoryModel.addNewSubCategory(category,subcategory);
    if (ret==null)
        res.send("OOPS! Can't add new subcategory");
    else
        res.send("New subcategory has been added");
});

router.patch("/category/update",async function (req,res){
    const oldcategory=req.body.oldcategory;
    const newcategory=req.body.newcategory;
    const ret=await categoryModel.updateCategory(oldcategory,newcategory);
    if (ret==null)
        res.send("OOPS! Can't modify category");
    else
        res.send("Category has been modified");
});

router.patch("/category/subcategory/update",async function (req,res){
    const category=req.body.category;
    const oldSubcategory=req.body.oldsubcategory;
    const newSubcategory=req.body.newsubcategory;
    const ret=await categoryModel.updateSubcategory(category,oldSubcategory,newSubcategory);
    if (ret==null)
        res.send("OOPS! Can't modify subcategory");
    else
        res.send("Subcategory has been modified");
});

router.delete("/category/delete",async function (req,res){
    const category=req.body.category;
    const ret1=await categoryModel.findCategory(category);
    if (ret1==null)
        res.send("Not found");
    else{
        const subcategories=ret1.subcategories;
        if (subcategories.length===0) {
            const ret2=await categoryModel.deleteCategory(category);
            if (ret2==null)
                res.send("Failed to delete category");
            else
                res.send("Deleted successfully");
        }
        else {
            let ok=true;
            for (let sub of subcategories) {
                console.log(sub);
                if (sub.product_ids.length>0)
                    ok=false
                if (!ok) break;
            }
            if (!ok)
                res.send("At least one product of this category exists, unable to delete it");
            else{
                const ret3=await categoryModel.deleteCategory(category);
                if (ret3==null)
                    res.send("Failed to delete category");
                else
                    res.send("Deleted successfully");
            }
                    
        }
    }
});

router.delete("/category/subcategory/delete",async function (req,res){
    const category=req.body.category;
    const subcategory=req.body.subcategory;
    const ret1=await categoryModel.findCategory(category);
    if (ret1==null)
        res.send("Not found");
    else{
        let ok=true;
        for (let sub of ret1.subcategories) {
            if (sub.name===subcategory)
                if (sub.product_ids.length>0)
                    ok=false;
            if (!ok) break;
        }
        
        if (!ok)
            res.send("At least one product of this subcategory exists, unable to delete it");
        else {
            const ret2=await categoryModel.deleteSubcategory(category,subcategory);
            if (ret2==null)
                res.send("Failed to delete subcategories");
            else
                res.send("Deleted successfully");
        }
    }

});


router.delete("/product/delete/",async function(req,res){
    const id=req.query.id;
    const category=req.query.category;
    const subcategory=req.query.subcategory;

    const ret1=categoryModel.deleteIteminCategory(category,subcategory,id);
    if (ret1==null)
        res.send("Failed to remove item from category");
    else {
        const ret2=itemModel.deleteItem(id);
        if (ret2==null)
            res.send("Failed to delete item");
        else
            res.send("Deleted item successfully");
    }
    
    
});
export default router;