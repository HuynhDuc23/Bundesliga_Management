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
            message:'Season created successfully',
            Season: newSeason
        });
      } catch (error) {
        return res.status(500).json({message:'Failed create'})
      }
    }
    export const getSeasonById = async (req, res) => {
      const { seasonId } = req.params;
      try {
          const season = await Season.findById(seasonId);
          if (!season) {
              return res.status(404).json({ message: 'Season not found' });
          }
          return res.status(200).json({ message: 'Success', data: season });
      } catch (error) {
          return res.status(500).json({ message: 'Failed to get season' });
      }
  };
  export const updateSeason = async (req, res) => {
    const { seasonId } = req.params;
    const { year_start, year_end } = req.body;
    try {
        const updatedSeason = await Season.findByIdAndUpdate(
            seasonId,
            { year_start, year_end },
            { new: true }
        );
        if (!updatedSeason) {
            return res.status(404).json({ message: 'Season not found' });
        }
        return res.status(200).json({ message: 'Season updated successfully', data: updatedSeason });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update season' });
    }
};
  export const deleteSeason = async (req, res) => {
  const { seasonId } = req.params;
  try {
      const deletedSeason = await Season.findByIdAndDelete(seasonId);
      if (!deletedSeason) {
          return res.status(404).json({ message: 'Season not found' });
      }
      return res.status(200).json({ message: 'Season deleted successfully' });
  } catch (error) {
      return res.status(500).json({ message: 'Failed to delete season' });
  }
};
// Sử dụng deleteSeason trong route của bạn
// Ví dụ: app.delete('/seasons/:seasonId', deleteSeason);
// Sử dụng updateSeason trong route của bạn
// Ví dụ: app.put('/seasons/:seasonId', updateSeason);
