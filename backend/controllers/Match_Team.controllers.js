import MatchTeam from "../models/Match_Team.model.js";
import Match from "../models/Match.model.js";

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

// tìm theo id của team 
export const getMatchTeamById = async (req, res) => {
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
    const session = await Match.startSession();
    session.startTransaction();
    try {
        const { date, ID_season, description } = req.body;
        
        // Tạo mới đối tượng match
        const newMatch = new Match({
            date,
            ID_season,
            description,
            card: { yellowcard: 0, redcard: 0 },
        });

        // Lưu đối tượng match vào cơ sở dữ liệu và lấy _id của nó
        const match = await newMatch.save({ session });
        const matchId = match._id;

        // Tạo mới đối tượng matchteam thứ nhất với idmatch đã lấy
        const { stadium } = req.body;
        const matchteam1 = new MatchTeam({
            ID_match: matchId,
            status: 0,
            score: 0,
            stadium
        });

        // Tạo mới đối tượng matchteam thứ hai với idmatch đã lấy
        // Có thể có các dữ liệu khác cho matchteam thứ hai ở đây
        const matchteam2 = new MatchTeam({
            ID_match: matchId,
            status: 0,
            score: 0,
            stadium
        });

        // Lưu cả hai đối tượng matchteam vào cơ sở dữ liệu
        await Promise.all([matchteam1.save({ session }), matchteam2.save({ session })]);

        // Commit giao dịch
        await session.commitTransaction();

        // Kết thúc session
        session.endSession();

        return res.status(201).json({
            message: "Match and MatchTeams created successfully",
            match: match,
            matchteam1: matchteam1,
            matchteam2: matchteam2
        });
    } catch (error) {
        // Rollback giao dịch nếu có lỗi
        await session.abortTransaction();
        
        // Kết thúc session
        session.endSession();
        
        return res.status(500).json({ message: "Failed to create match and matchteams" });
    }
}