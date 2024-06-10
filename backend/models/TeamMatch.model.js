
import mongoose, { Schema } from "mongoose";
const teamMatchSchema = new mongoose.Schema(
    {
        team:{
            type:Schema.Types.ObjectId,ref:'Team',
            required:true
        },
        match:{
            type:Schema.Types.ObjectId,ref:'Match',
            required:true
        },
        score:{
            type:Number,
            required:true
        },
        goal:{
            type:Number,
            default:0
        }
    }
)
export default mongoose.model("TeamMatch",teamMatchSchema);