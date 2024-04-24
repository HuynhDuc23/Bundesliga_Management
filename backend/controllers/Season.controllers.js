import Season from "../models/Season.model"
export const getAllSeason = async (req, res) => {
    try {
      const Season = await Season.find();
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
  export const createSeason = async (req, res) => {
      try {
        const {
          year_start, year_end
        } = req.body;
        const newSeason = new Season({
          year_start,
          year_end
        });
        await newSeason.save();
        return res.status(201).json({
            message:'Player created successfully',
            Season: newSeason
        });
      } catch (error) {
        return res.status(500).json({message:'Failed create'})
      }
    }