import MatchTeam from "../models/TeamMatch.model.js";
import Match from "../models/Match.model.js";
import Team from "../models/Team.model.js";
import Player from "../models/Player.model.js";

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
        const matchTeams = await MatchTeam.find({ match: ID_match });
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
        const matchteam = await MatchTeam.findOne({ team: id });
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
        const { date, season, teamId1, teamId2, stadium, description } = req.body;

        const team1 = await Team.findById(teamId1 ).exec();
        const team2 = await Team.findById(teamId2).exec();
        
        if (!team1 || !team2) {
            throw new Error('Team not found');
        }

        const players = [...team1.players,...team2.players];
        // console.log(players);
        
        // Tạo mới đối tượng match
        const newMatch = new Match({
            date: date,
            season: season,
            stadium: stadium,
            description: description,
            players: players
        });
        
        // Lưu đối tượng match vào cơ sở dữ liệu và lấy _id của nó
        const imatch = await newMatch.save();
        const matchId = imatch._id;

        // Thêm id match vào tất cả model player có id trong list id players
        await Promise.all(players.map(async (playerId) => {
            await Player.findByIdAndUpdate(
                { _id: playerId._id}, 
                { $addToSet: { matchs: { idMatch: matchId } } }, // Sử dụng $addToSet để tránh trùng lặp
                { new: true }
            );
        }));

        // Tạo mới đối tượng matchteam thứ nhất với idmatch đã lấy
        const matchteam1 = new MatchTeam({
            match: matchId,
            team: teamId1,
            status: 0,
            score: 0,
        });

        // Tạo mới đối tượng matchteam thứ hai với idmatch đã lấy
        const matchteam2 = new MatchTeam({
            match: matchId,
            team: teamId2,
            status: 0,
            score: 0,
        });

        // Lưu cả hai đối tượng matchteam vào cơ sở dữ liệu
        await Promise.all([matchteam1.save(), matchteam2.save()]);

        return res.status(201).json({
            message: "Match and MatchTeams created successfully",
            match: imatch,
            matchteam1: matchteam1,
            matchteam2: matchteam2
        });
    } catch (error) {
        // Ghi lại chi tiết lỗi
        console.error('Error creating match and matchteams:', error);

        return res.status(500).render("pages/error", { data: "Failed to create match and matchteams" });
    }
};
