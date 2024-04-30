import Season from "../models/Season.model.js";
import TeamSeason from "../models/TeamSeason.model.js";

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
      const dataSeason = await Season.findById(req.params.id);
      const dataTeamSeason = await TeamSeason.find();
      if (!data) {
        return res.status(400).json({
          message: "Cant not get season by id",
        });
      }
      return res.status(200).json({
        message: "Success",
        data: dataSeason,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  // delete season
  export const deleteSeason = async (req, res) => {
    try {
      const dataSeasonDelete = await Season.findByIdAndDelete(req.params.id);
      if (!dataSeasonDelete) {
        return res.status(400).json({
          message: "Cant not delete season",
        });
      }
      await TeamSeason.deleteMany({ season: req.params.id });
      return res.status(200).json({
        message: "Success",
        data: dataSeasonDelete,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  // update season
  export const updateSeason = async (req, res) => {
    try {
      const filter = await Season.findById(req.params.id);


      // Tạo đối tượng update dựa trên thông tin từ yêu cầu
     // const update = { name, yearStart, yearEnd }; // Thay đổi thông tin của season
        // Cập nhật và trả về tài liệu sau khi cập nhật
        const updatedSeason = await Season.updateOne({$set: req.body});
        if (!updatedSeason) {
            return res.status(404).json({
                message: "Season not found",
            });
        }

        return res.status(200).json({
            message: "Season updated successfully",
            data: updatedSeason,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};