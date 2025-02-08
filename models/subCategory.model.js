import mongoose, { mongo } from "mongoose";
import { useDeferredValue } from "react";

const subCategorySchema = new mongoose.Schema({
    name : {
        type : String,
        default : ""
    },
    image : {
        type : String,
        default : ""
    },
    categoryid : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'category'
        }
    ]
},{
    timestamps : true
})

const SubCategoryModel = mongoose.model('subCategory',subCategorySchema)


export default SubCategoryModel