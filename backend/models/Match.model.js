import mongoose, { Schema } from "mongoose";
const matchSchema = new mongoose.Schema(
{
    date: {
        type: Date,
        required: true
    },
    ID_season:[{type:Schema.Types.ObjectId,ref:'Season'}],
    card:{
        type:String,
    },
    description:{
        type:String,
    }
}
)
export default mongoose.model("Match", matchSchema);