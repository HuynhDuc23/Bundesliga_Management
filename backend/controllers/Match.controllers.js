import Match from "../models/Match.model.js";
import MatchTeam from "../models/Match_Team.model.js";
import Season from "../models/Season.model.js";
import Player from "../models/Player.model.js";

export const getAllMatches = async (req, res) => {
  try { 
    const matches = await Match.find();
    if (!matches) {
      return res.status(404).json({
        message: "Can't get all matches!",
      });
    }
    return res.status(200).json({
      message: "Success!",
      data: matches,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const getMatchById = async (req, res) => {
  try { 
    const idmatch = req.params.id;
    const match = await Match.findById(idmatch);
    if (!match) {
      return res.status(404).json({
        message: "Can't get match!",
      });
    }
    return res.status(200).json({
      message: "Success!",
      data: match,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      name: error.name,
    });
  }
};

// tìm match theo id của season
export const getMatchByIdSS = async (req, res) => {
    try {
      const ID_season = req.params.id;
      const match = await Match.find({ID_season: ID_season});
      if (!match) {
        return res.status(404).json({ match: "Match not found" });
      }
      return res.status(201).json({
        match: match
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to get match" });
    }
  };  


export const updateMatch = async (req, res) => {
  try {
    // const id = req.params.id;
    const { matchId, date, stadium, description }= req.body;
    const updatedMatch = await Match.findByIdAndUpdate(
      matchId,
      { date, stadium, description },
      { new: true }
    );
    if (!updatedMatch) {
      return res.status(404).json({ message: "Match not found" });
    }

    // const updatedMatchTeam1 = await MatchTeam.findOneAndUpdate(
    //   { ID_match: matchId, ID_team: id1 }, 
    //   { ID_team: teamId1 },  
    //   { new: true }  
    // );
    // if (!updatedMatchTeam1) {
    //   return res.status(404).json({ message: "MatchTeam not found" });
    // }

    // const updatedMatchTeam2 = await MatchTeam.findOneAndUpdate(
    //   { ID_match: matchId, ID_team: id2 }, 
    //   { ID_team: teamId2 },  
    //   { new: true }  
    // );
    
    // if (!updatedMatchTeam2) {
    //   return res.status(404).json({ message: "MatchTeam not found" });
    // }

    return res.status(200).json({
      message: "Match updated successfully",
      match: updatedMatch,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update match" });
  }
};

export const deleteMatch = async (req, res) => {
  try {
    const id = req.params.id;
    // Xóa tất cả các bản ghi MatchTeam liên quan đến Match
    const deletedMatchTeams = await MatchTeam.deleteMany({ ID_match: id });
    if (deletedMatchTeams.deletedCount === 0) {
      return res.status(404).json({ message: "No match teams found to delete" });
    }
    const match = await Match.findById({ _id: id }).exec();
    const players = match.players;
    await Promise.all(players.map(async (playerId) => {
      await Player.findByIdAndUpdate(
          { _id: playerId._id}, 
          { $pull: { matchs: { idMatch: id } } }, 
          { new: true }
      );
  }));

    
    // Xóa Match
    const deletedMatch = await Match.findByIdAndDelete({ _id: id });
    if (!deletedMatch) {
      return res.status(404).json({ message: "Match not found" });
    }

    return res.status(200).json({ message: "Match and related match teams deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete match and related match teams" });
  }
};

export const getRanking = async (req, res) => {
  const seasonId = req.params.id; // Lấy ID của mùa giải từ request

  try {
      // Lấy tất cả các trận đấu thuộc mùa giải cụ thể
      const matches = await Match.find({ ID_season: seasonId }).exec();

      // Khởi tạo một đối tượng để lưu điểm số của từng đội
      const teamScores = {};

      // Lặp qua từng trận đấu
      for (const match of matches) {
          // Lấy danh sách MatchTeam của trận đấu
          const matchTeams = await MatchTeam.find({ ID_match: match._id }).exec();

          // Nếu có đúng 2 MatchTeam trong mỗi trận đấu
          if (matchTeams.length === 2) {
              // So sánh goal của 2 đội và cập nhật điểm cho từng đội
              if (matchTeams[0].goal > matchTeams[1].goal) {
                  teamScores[matchTeams[0].ID_team] = (teamScores[matchTeams[0].ID_team] || 0) + 3;
              } else if (matchTeams[0].goal < matchTeams[1].goal) {
                  teamScores[matchTeams[1].ID_team] = (teamScores[matchTeams[1].ID_team] || 0) + 3;
              } else {
                  teamScores[matchTeams[0].ID_team] = (teamScores[matchTeams[0].ID_team] || 0) + 1;
                  teamScores[matchTeams[1].ID_team] = (teamScores[matchTeams[1].ID_team] || 0) + 1;
              }
          }
      }

      // Chuyển đổi teamScores thành mảng các đội với điểm số
      const teams = Object.keys(teamScores).map(teamId => ({ ID_team: teamId, score: teamScores[teamId] }));

      // Sắp xếp các đội theo điểm số từ cao đến thấp
      teams.sort((a, b) => b.score - a.score);

      // Lấy thông tin chi tiết của từng đội (tên, logo, vv.) từ cơ sở dữ liệu và gửi về client

      res.json(teams);
  } catch (error) {
      console.error('Error getting ranking:', error);
      res.status(500).json({ error: 'Failed to get ranking' });
  }
};


export const rank = async (req, res) => {
  try {
    // Lấy danh sách mùa giải từ cơ sở dữ liệu
    const seasons = await Season.find().select('_id name');

    // Truyền danh sách mùa giải vào giao diện rank
    res.render('pages/rank', { seasons });
  } catch (error) {
    console.error('Error fetching seasons:', error);
    res.status(500).send('Failed to fetch seasons');
  }
};

