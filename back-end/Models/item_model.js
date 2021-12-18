import mongoose from "mongoose";
import itemSchema from "../schemas/item_schema.js";

const itemModel = mongoose.model("Items",itemSchema,"Items");

export default {    
    findAll: async function(){
        return await itemModel.find({});
    },

    findById: async function(id){
        return await itemModel.findById(id);
    },
    
    findByItemNm: async function (item_nm){
        return await itemModel.findOne({item_nm:item_nm});
    },

    addNewItem: async function (item_info){
        try{
            return await itemModel.create(item_info);
        } catch (err){
            console.log(err);
        }
    },

    bidItem: async function (item_id, price, bidder_id, bidder_nm){
        try{
            return await itemModel.findOneAndUpdate({_id: item_id},{current_price: price, current_bidder_id: bidder_id, current_bidder_nm: bidder_nm});
        } catch (err){
            console.log(err);
        }
    },

    bidItem: async function (item_id, itemInfo){
        try{
            return await itemModel.findOneAndUpdate({_id: item_id}, itemInfo);
        } catch (err){
            console.log(err);
        }
    },

    deleteItem: async function (item_id){
        try{
            const res = await itemModel.deleteOne({ _id: item_id });
            return res.deletedCount;
        } catch (err){
            console.log(err);
        }
    }
};