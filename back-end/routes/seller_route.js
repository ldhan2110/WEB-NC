import express from "express";
import itemModel from "../models/item_model.js";
import categoryModel from "../models/category_model.js";

const router=express.Router();

router.post("/product/add",async function (req,res){
    const body=req.body;
    const category=req.query.category;
    const subcategory=req.query.subcategory;    
    
    const ret1=await itemModel.addNewItem(body);
    if (ret1==null)
        res.send("Failed to add item");
    else {
        const product_ref={id: ret1._id.valueOf(), name: ret1.item_nm}
        //console.log(product_ref);
        const ret2=await categoryModel.addIteminCategory(category,subcategory,product_ref);
        if (ret2==null)
            res.send("Failed to add item in category");
        else
            res.send("Add item successfully");
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

export default router;