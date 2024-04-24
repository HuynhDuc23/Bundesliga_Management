import TeamSeason from "../models/Team_season.model"
export const getAllSeason = async (req, res) => {
    try {
      const TeamSeason = await TeamSeason.find();
      if (!Season) {
        return res.status(404).json({
          message: "Cant not get all Season!",
        });
      }
      return res.status(200).json({
        message: "Success!",
        data: Season,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  };
  export const createTeamSeason = async (req, res) => {
      try {
        const {
          ID_season,  ID_team
        } = req.body;
        const newTeamSeason = new TeamSeason({
          ID_season, 
          ID_team
        });
        await newTeamSeason.save();
        return res.status(201).json({
            message:'TeamSeason created successfully',
            TeamSeason: newTeamSeason
        });
      } catch (error) {
        return res.status(500).json({message:'Failed create'})
      }
    }