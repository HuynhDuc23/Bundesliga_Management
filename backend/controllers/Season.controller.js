import Season from "../models/Season.model.js";

// get all season
export const getAllSeason = async (req, res) => {
  try {
    const data = await Season.find();
    if (!data) {
      return res.status(400).render('error', {
        data: "Cant not get all season"
      });
    }
    data.sort((a, b) => b.yearEnd - a.yearEnd);
    return res.render("pages/season_match", {
      data
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};