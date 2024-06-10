import TeamSeason from "../models/TeamSeason.model.js";
import Team from "../models/Team.model.js";

// Lấy team trong season theo id season
export const getTeamInSeasonById = async (req, res) => {
  try {
    // Lấy id mùa bóng đá
    const idSeason = req.params.id;
    console.log(idSeason);
    if (!idSeason) {
      return res.status(400).render('error', {
        data: "mùa không được tìm thấy "
      });
    }
    // Lấy thông tin về các đội trong mùa
    const dataTeamSeasons = await TeamSeason.find({
      ID_season: idSeason
    });
    console.log(dataTeamSeasons);
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
    console.log("Data team: "+dataTeams)
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

export const getAllTeam = async (req, res) => {
    try {
      const teams = await Team.find();
      if (!teams) {
        return res.status(404).json({
          message: "Cant not get all teams!",
        });
      }
      return res.status(200).json({
        message: "Success!",
        data: teams,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  };

  // Lấy thông tin chi tiết đội bóng từ ID đội bóng
export const getTeamById = async (req, res) => {
  try {
      const ID_team = req.params.id;
      const team = await Team.findById(ID_team);
      if (!team) {
          return res.status(404).json({ team: "Team not found" });
      }
      return res.status(201).json({
          team: team
      });
  } catch (error) {
      return res.status(500).json({ message: "Failed to get team" });
  }
};

export const createTeam = async (req, res) => {
      try {
        const {name,nameArena,logo,imgArena,description} = req.body;
        const newTeam = new Team({
            name,
            nameArena,
            logo,
            imgArena,
            description
        });
        await newTeam.save();
        return res.status(201).json({
            message:'Team created successfully',
            team: newTeam
        });
      } catch (error) {
        return res.status(500).json({message:'Failed create'})
      }
    }