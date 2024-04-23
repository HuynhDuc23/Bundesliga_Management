import mongoose from "mongoose";
const playerSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            minlength: 6,
            maxlength: 20,
        },
        heigh:{
            type:Number,
            required:true
        },
        weight:{
            type:Number,
            required:true
        },
        shirtNumber:{
            type:Number,
            required:true,
            maxlength:2,
            unique:true
        },
        shirtSize:{
            type:String,
            minlength:1,
            maxlength:4,
        },
        goal:{
            type:Number,
            required:true
        },
        team:{
            type: Schema.Types.ObjectId, ref: 'Team'
        }
    }
)
export default mongoose.model("Player", playerSchema);