// import { Schema } from "mongoose";
import mongoose, {model, Schema, models} from "mongoose";
const ProductSchema = new Schema({
    title: { type: String,require:true },
    description: { type: String},
    price:  { type: Number,require:true},
});

// export const Product =  model('Product',ProductSchema);
export const Product = models.Product || model('Product', ProductSchema);