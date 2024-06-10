import mongoose, { Schema } from "mongoose";
const matchTeamSchema = new mongoose.Schema({
    match: {
        type: Schema.Types.ObjectId,
        ref: 'Match'
    },
    ID_team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    score: {
        type: Number,
        default: 0
    },
    goal: {
        type: Number,
        default: 0
    },
});
const MatchTeam = mongoose.model("MatchTeam", matchTeamSchema);
export default MatchTeam;