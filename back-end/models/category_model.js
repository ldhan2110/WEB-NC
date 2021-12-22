import mongoose from "mongoose";
import categorySchema from "../schemas/category_schema.js";
import itemModel from "./item_model.js";

const categoryModel=mongoose.model("Categories",categorySchema,"Categories");

export default {

    findAll: async function(){
        return await categoryModel.find({});
    },

    findCategory: async function (category){
        return await categoryModel.findOne({category_name: category});
    },

      
    addNewCategory: async function (new_category){
        return await categoryModel.create(new_category);
    },
    
    addNewSubCategory: async function (category, new_subcategory){
        let tmp={
            name: new_subcategory,
            product_ids: []
        };  
        
        return await categoryModel.findOneAndUpdate(
            {category_name:category},
            {$push: {subcategories: tmp}}
        );
    },

    updateCategory: async function (oldCategory, newCategory){
        return await categoryModel.findOneAndUpdate(
            {category_name:oldCategory},
            {category_name:newCategory}
        )
    },

    updateSubcategory: async function (category,oldSubcategory,newSubcategory){
        
        return await categoryModel.findOneAndUpdate(
            {category_name: category, "subcategories.name": oldSubcategory},
            {$set: {"subcategories.$.name": newSubcategory}}
        )
    },

    deleteCategory: async function (category){
        return await categoryModel.remove({category_name:category});
    },

    deleteSubcategory: async function (category,subcategory){
        return await categoryModel.findOneAndUpdate(
            {category_name:category},
            {$pull: {subcategories: {name: subcategory}}}
        );
    },

    addIteminCategory: async function (category, subcategory,product_ref) {
        const ret=await categoryModel.findOne({category_name:category, "subcategories.name": subcategory});
        
        if (ret==null)
            return null;
        
        const listProducts=ret.subcategories.find(k => k.name===subcategory).product_ids;
        
        listProducts.push(product_ref);
        
        return await categoryModel.findOneAndUpdate(
            {category_name:category, "subcategories.name": subcategory},
            {$set: {"subcategories.$.product_ids": listProducts}}
        );
    },

    deleteIteminCategory: async function (category,subcategory,item_id){
        const ret=await categoryModel.findOne({category_name:category, "subcategories.name": subcategory});
        if (ret==null)
            return null;
        
        const listProducts=ret.subcategories.find(k => k.name===subcategory).product_ids;
        const newchanges=listProducts.filter(k => k.id!=item_id);
        
        return await categoryModel.findOneAndUpdate(
            {category_name:category, "subcategories.name": subcategory},
            {$set: {"subcategories.$.product_ids": newchanges}}
        );
    }

};
