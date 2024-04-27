
import mongoose, { Mongoose, Schema } from "mongoose";
const playerMatchSchema = new mongoose.Schema(
    {
        match:{
            type: Schema.Types.ObjectId,ref:'Match',required:true
        },
        player:{
            type: Schema.Types.ObjectId,ref:'Player',required:true
        },
        events:[
            {
                type:{type:String, enum:['goal','foul'],required:true},
                minutes:{type:Number,required:true},
                score:{type:String}, // red card or yellow card 
                card:{type:String,enum:['yellow','red']}, // Score a goal with what action
            }
        ]
    }
)
export default mongoose.model("PlayerMatch",playerMatchSchema);