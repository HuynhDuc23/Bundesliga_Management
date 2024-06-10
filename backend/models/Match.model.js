import mongoose, {
    Schema
} from "mongoose";
const matchSchema = new mongoose.Schema({
    season: {
        type: Schema.Types.ObjectId,
        ref: 'Season'
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    stadium: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    players:[
        {
               type: Schema.Types.ObjectId,ref:'Player'
        }
    ]
    
    },
)

const Match = mongoose.model("Match", matchSchema);
export default Match;