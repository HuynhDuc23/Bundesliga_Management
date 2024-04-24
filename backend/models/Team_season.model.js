import mongoose from "mongoose";
const teamSeasonSchema = new mongoose.Schema(
  {
    ID_season:{
        type: Schema.Types.ObjectId, ref: 'Season'
    },
    ID_team:{
        type: Schema.Types.ObjectId, ref: 'Team'
    }
  },
  {
    timestamps: true,
  }
);
teamSeasonSchema.plugin(mongoosePaginate);
export default mongoose.model("TeamSeason", teamSeasonSchema);
