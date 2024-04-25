import MatchTeam from "../models/Match_Team.model.js";

export const getAllMatchTeams = async (req, res) => {
    try {
        const matchteams = await MatchTeam.find();
        if (!matchteams) {
            return res.status(404).json({
                message: "Can't get all MatchTeam"
            });
        }
        return res.status(200).json({
            message: "Success!",
            data: matchteams,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.name,
            error: error.message,
        });
    }
}

export const getMatchTeamById = async (req, res) => {
    try {
        const { id } = req.params;
        const matchteam = await MatchTeam.findOne({ fieldName: id });
        if (!matchteam) {
            return res.status(404).json({ message: "Matchteam not found" });
          }
          return res.status(200).json({
            message: "Success",
            data: matchteam,
          });
    } catch (error) {
        return res.status(500).json({ message: "Failed to get matchteam" });
    }
};


