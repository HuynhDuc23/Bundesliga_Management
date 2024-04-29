import Season from "../models/Season.model.js";

// CREATE ROLE
export const createSeason = async (req, res) => {
    try {
        const dataSeason = await Season.find();
        const dataSeasonSortYearEnd = dataSeason.sort((a,b) => new Date(b.yearEnd) - new Date(a.yearEnd));
        const yearEndNew = dataSeasonSortYearEnd[0];
        const data = new Season(req.body);
        if(data.yearStart > yearEndNew.yearStart && data.yearEnd > yearEndNew.yearEnd) {
            await data.save();
            return res.status(201).json({
                message: "Create Season successfully",
                data: dataSeasonSortYearEnd,
              });
        }
        else {
          return res.status(400).json({
            message: "Cant not create Season ",
            yearEndNew : yearEndNew,
          });
        }
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
  };
  // get all season
  export const getAllSeason = async (req, res) => {
    try {
      const data = await Season.find();
      if (!data) {
        return res.status(400).json({
          message: "Cant not get all season",
        });
      }
      return res.status(200).json({
        message: "Success",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  // get season by id
  export const getSeasonById = async (req, res) => {
    try {
      const data = await Season.findById(req.params.id);
      if (!data) {
        return res.status(400).json({
          message: "Cant not get season by id",
        });
      }
      return res.status(200).json({
        message: "Success",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
