import mongoose from "mongoose";

const itemSchema=new mongoose.Schema({
    id: String,
    item_nm:String,
    owner_id: String,
    owner_nm: String,
    description: String,
    current_price: Number,
    current_bidder_id: String,
    current_bidder_nm: String,
    init_price: Number,
    step_price: Number,
    list_img: {type: Array, default:[]},
    auction_start: String,
    auction_end: String,
    active: { type: Boolean, default: true },
    create_date: { type: Date, default: Date.now },
});

export default itemSchema;