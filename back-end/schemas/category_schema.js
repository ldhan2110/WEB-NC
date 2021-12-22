import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    category_name:String,
    subcategories: {type:[Object], default:[]},
},  { minimize: false });

export default categorySchema;