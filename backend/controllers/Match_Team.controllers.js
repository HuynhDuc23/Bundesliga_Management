import MatchTeam from "../models/Match_Team.model.js";
import Match from "../models/Match.model.js";

export const getAllMatchTeams = async (req, res) => {
    try {
        const matchteams = await MatchTeam.find();
        if (!matchteams) {
            return res.status(404).json({
                matchteams: "Can't get all MatchTeam"
            });
        }
        return res.render("pages/match",{
            matchteams
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

// Lấy thông tin matchteam từ id trận đấu
export const getMatchTeamsByMatchId = async (req, res) => {
    try {
        const ID_match = req.params.id;
        const matchTeams = await MatchTeam.find({ ID_match: ID_match });
        if (!matchTeams) {
            return res.status(404).json({ matchTeams: "Match teams not found" });
        }
        return res.status(201).json({
            matchTeams: matchTeams
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to get match teams" });
    }
};

// tìm theo id của team 
export const getMatchTeamByIdTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const matchteam = await MatchTeam.findOne({ ID_team: id });
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

export const createMatchTeam = async (req, res) => {
    try {
        const { date, ID_season, teamId1, teamId2, stadium, description } = req.body;

        // Tạo mới đối tượng match
        const newMatch = new Match({
            date: date,
            ID_season: ID_season,
            stadium: stadium,
            description: description,
        });

        // Lưu đối tượng match vào cơ sở dữ liệu và lấy _id của nó
        const match = await newMatch.save();
        const matchId = match._id;

        // Tạo mới đối tượng matchteam thứ nhất với idmatch đã lấy
        const matchteam1 = new MatchTeam({
            ID_match: matchId,
            ID_team: teamId1,
            status: 0,
            score: 0,
        });

        // Tạo mới đối tượng matchteam thứ hai với idmatch đã lấy
        const matchteam2 = new MatchTeam({
            ID_match: matchId,
            ID_team: teamId2,
            status: 0,
            score: 0,
        });

        // Lưu cả hai đối tượng matchteam vào cơ sở dữ liệu
        await Promise.all([matchteam1.save(), matchteam2.save()]);

        return res.status(201).json({
            message: "Match and MatchTeams created successfully",
            match: match,
            matchteam1: matchteam1,
            matchteam2: matchteam2
        });
    } catch (error) {
        // Ghi lại chi tiết lỗi
        console.error('Error creating match and matchteams:', error);

        return res.status(500).render("pages/error", { data: "Failed to create match and matchteams" });
    }
};
