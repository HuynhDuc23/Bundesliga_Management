import mongoose, { Schema } from "mongoose";
const teamSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required: true,
        minlength: 10,
        maxlength: 40,
        unique: true,
    },
    nameArena:{
        type:String,
        required: true,
        minlength: 10,
        maxlength: 40,
        unique: true,
    },
    logo:{
        type:String,
        required: true,
        unique:true
    },
    imgArena:{
        type:String,
        required: true,
        unique: true,
    },
    description:{
        type:String,
    },
    players:[{type:Schema.Types.ObjectId,ref:'Player'}]
}
)
export default mongoose.model("Team", teamSchema);