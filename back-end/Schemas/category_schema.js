import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:String,
    products: {type:[Object], default:[]},
    parent: {type: String, default: null}
},  { minimize: false });

export default categorySchema;