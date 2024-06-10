import Season from "../models/Season.model.js";
import TeamSeason from "../models/TeamSeason.model.js";
import Team from "../models/Team.model.js";

export const createTeamSeason = async (req, res) => {
    try {
        const { seasonId, teamIds } = req.body;

        const teamSeasonPromises = teamIds.map(teamId => {
            return new TeamSeason({ season: seasonId, team: teamId }).save();
        });

        await Promise.all(teamSeasonPromises);

        return res.status(201).json({ success: true, message: 'Teams successfully added to the season' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const getAllTeamSeason = async (req, res) => {
    try {
      const teamSeason = await TeamSeason.find();
      if (!teamSeason) {
        return res.status(404).json({
          message: "Cant not get all TeamSeason!",
        });
      }
      return res.status(200).json({
        message: "Success!",
        data: teamSeason,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  };
//   export const createTeamSeason = async (req, res) => {
//       try {
//         const {
//           ID_season,  ID_team
//         } = req.body;
//         const newTeamSeason = new TeamSeason({
//           ID_season, 
//           ID_team
//         });
//         await newTeamSeason.save();
//         return res.status(201).json({
//             message:'TeamSeason created successfully',
//             TeamSeason: newTeamSeason
//         });
//       } catch (error) {
//         return res.status(500).json({message:'Failed create'})
//       }
//     }