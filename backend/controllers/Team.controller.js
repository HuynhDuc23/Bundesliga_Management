import Team from "../models/Team.model.js"

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