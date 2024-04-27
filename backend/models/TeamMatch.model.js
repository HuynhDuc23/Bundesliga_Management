
import mongoose, { Schema } from "mongoose";
const teamMatchSchema = new mongoose.Schema(
    {
        team:{
            type:Schema.Types.ObjectId,ref:'Team',
            required:true
        },
        match:{
            type:Schema.Types.ObjectId,ref:'Team',
            required:true
        },
        score:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            enum: ['completed','paused'],
            required:true
        }
    }
)
export default mongoose.model("TeamMatch",teamMatchSchema);