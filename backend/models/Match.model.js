
import mongoose, { Mongoose, Schema } from "mongoose";
const matchSchema = new mongoose.Schema(
    {
        season:{
            type: Schema.Types.ObjectId,ref:'Season'
        },
        date:{
            type:Date,
            required: true,
        },
        description:{
            type:String,
            required:true,
            minlength:10,
        },
        stadium:{   
            type:String,
            required:true
        },
        status:{
            type:Number,
            default:0
        },
        players:[
             {
            type: Schema.Types.ObjectId,ref:'Player'
             },
        ]
    }
)
export default mongoose.model("Match",matchSchema);