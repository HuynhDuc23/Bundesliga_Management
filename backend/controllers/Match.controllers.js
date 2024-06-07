import Match from "../models/Match.model.js";
import TeamSeason from "../models/TeamSeason.model.js";
import Team from "../models/Team.model.js";
import MatchTeam from "../models/Match_Team.model.js";

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

// Lấy team trong season theo id season
export const getTeamInSeasonById = async (req, res) => {
  try {
    // Lấy id mùa bóng đá
    const idSeason = req.params.id;
    if (!idSeason) {
      return res.status(400).render('error', {
        data: "mùa không được tìm thấy "
      });
    }

    // Lấy thông tin về các đội trong mùa
    const dataTeamSeasons = await TeamSeason.find({
      ID_season: idSeason
    });
    if (!dataTeamSeasons || dataTeamSeasons.length === 0) {
      return res.status(400).render('pages/error', {
        data: "không có team nào trong mùa này"
      });
    }

    // Lấy thông tin về từng đội
    const teamIds = dataTeamSeasons.map((teamSeason) => teamSeason.ID_team);
    const dataTeams = await Team.find({
      _id: {
        $in: teamIds
      }
    });
    
    return res.status(200).render("pages/addMatch",{
      data: {
        ID_season: idSeason,
        teams: dataTeams,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
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
    const id = req.params.id;
    const { date, stadium, description } = req.body;
    const updatedMatch = await Match.findByIdAndUpdate(
      id,
      { date, stadium, description },
      { new: true }
    );
    if (!updatedMatch) {
      return res.status(404).json({ message: "Match not found" });
    }
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
