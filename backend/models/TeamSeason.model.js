import mongoose from "mongoose";

const teamSeasonSchema = new mongoose.Schema({
    season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Season"
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }
});

const TeamSeason = mongoose.model("TeamSeason", teamSeasonSchema);
export default TeamSeason;


