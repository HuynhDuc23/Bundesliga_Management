import Season from "../models/Season.model.js";
import TeamSeason from "../models/TeamSeason.model.js";
import Team from "../models/Team.model.js";

// CREATE TeamSeason
export const createTeamSeason = async (req, res) => {
    try {
        const { seasonId, teamId } = req.body;
        const season = await Season.findById(seasonId);
        const team = await Team.findById(teamId);

        if (!season || !team) {
            return res.status(404).json( {
                message: "Season or Team not found",
            });
        }

        const teamSeason = new TeamSeason({ season: seasonId, team: teamId });
        await teamSeason.save();
        return res.status(201).json( {
            message: "Create TeamSeason successfully",
            teamSeason: teamSeason,
        });
    } catch (error) {
        return res.status(500).json( {
            message: error.message,
        });
    }
};