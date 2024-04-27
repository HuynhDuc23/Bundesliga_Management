
import mongoose, { Mongoose, Schema } from "mongoose";
const matchSchema = new mongoose.Schema(
    {
        session:{
            type: Schema.Types.ObjectId,ref:'Session'
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
        }
    }
)
export default mongoose.model("Match",matchSchema);