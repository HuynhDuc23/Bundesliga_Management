
import mongoose, { Schema } from "mongoose";
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
            unique:true
        },
        shirtSize:{
            type:String,
            minlength:1,
            maxlength:4,
        },
        goal:{
            type:Number,
            default:0
        },
        status:{
            type:Number,
            default:0
        },
        matchs:[
            {
                idMatch:{
                    type:Schema.Types.ObjectId,ref:'Match',
                },
                events:[
                    {
                        type:{type:String, enum:['goal','foul'],required:true},
                        minutes:{type:Number,required:true},
                        action:{type:String}, // Score a goal with what action 
                        card:{type:String,enum:['yellow','red']},  // red card or yellow card 
                    }
                ]
            }
        ]
    }
)
export default mongoose.model("Player", playerSchema);