import mongoose from "mongoose";
const matchTeamSchema = new mongoose.Schema({
    ID_match: {
        type: Schema.Types.ObjectId,
        ref: 'Match'
    },
    ID_team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    status: {
        type: Number,
        default: 0
    },
    score: {
        homeTeam: {
            type: Number,
            default: 0
        },
        awayTeam: {
            type: Number,
            default: 0
        }
    },
    stadium: {
        type: String,
        required: true
    },
});
matchTeamSchema.plugin(mongoosePaginate);
export default mongoose.model("TeamSeason", teamSeasonSchema);