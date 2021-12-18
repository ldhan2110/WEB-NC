import express from "express";
import itemModel from "../models/item_model.js";
import userModel from "../models/user_model.js";


const router=express.Router();

router.get("/getAll",async function(req,res){
    try {
        const listItem=await itemModel.findAll();
        res.send(listItem);
    } catch (error) {
        res.send(error);
    }
});

router.get("/:item_id",async function(req,res){
    try {
        const item_id = req.params.item_id;
        const ret=await itemModel.findById(item_id);
        if (ret)
            res.send(ret);
        else
            res.send("Nothing found!");
    } catch (error) {
        res.send(error);
    }
});

router.post("/add",async function (req,res){
    try{
        const itemInfo=req.body;
        res.send(await itemModel.addNewItem(itemInfo));
    } catch (error) {
        res.send(error);
    }
});

router.post("/bid-item",async function (req,res){
    try{
        const bidInfo = req.body;
        const userInfo = await userModel.findById(bidInfo.bidder_id);
        res.send(await itemModel.bidItem(bidInfo.item_id,bidInfo.price,bidInfo.bidder_id,userInfo.usr_nm));
    } catch (error) {
        res.send(error);
    }
});

router.patch("/update/:item_id",async function (req,res){
    try{
        const item_id = req.params.item_id;
        const itemInfo=req.body;
        res.send(await itemModel.updateItem(item_id, itemInfo));
    } catch (error) {
        res.send(error);
    }
});


router.delete("/update/:item_id",async function (req,res){
    try{
        const item_id = req.params.item_id;
        res.send(await itemModel.deleteItem(item_id) != 0 ? "Deleted" : "Nothing deleted");
    } catch (error) {
        res.send(error);
    }
});


export default router;