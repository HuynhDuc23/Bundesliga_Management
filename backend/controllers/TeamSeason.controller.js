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