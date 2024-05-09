import Season from "../models/Season.model.js";
import TeamSeason from "../models/TeamSeason.model.js";
import Team from "../models/Team.model.js";

// CREATE season
export const createSeason = async (req, res) => {
    try {
        const dataSeason = await Season.find();
        const dataSeasonSortYearEnd = dataSeason.sort((a,b) => new Date(b.yearEnd) - new Date(a.yearEnd));
        const yearSEndNew = dataSeasonSortYearEnd[0];
        const data = new Season(req.body);
        if(data.yearStart > yearEndNew.yearStart && data.yearEnd > yearEndNew.yearEnd) {
            await data.save();
            return res.status(201).render("season", {
              message: "Create Season successfully",
              data: dataSeasonSortYearEnd,
          });
        }
        else {
          return res.status(400).render("error", {
            message: "Cannot create Season",
            yearEndNew: yearEndNew,
        });
        }
      } catch (error) {
        return res.status(500).render("error", {
          message: error.message,
      });
      }
  };
  // get all season
  export const getAllSeason = async (req, res) => {
    try {
      const data = await Season.find();
      if (!data) {
        return res.status(400).render('error', { data:"Cant not get all season" });
      }
      data.sort((a, b) => b.yearEnd - a.yearEnd);
      return res.render("pages/season", {
        data
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
      // Lấy thông tin về mùa bóng đá
      const dataSeason = await Season.findById(req.params.id);
      if (!dataSeason) {
        return res.status(400).render('error', { data: "mùa không được tìm thấy " });
      }
  
      // Lấy thông tin về các đội trong mùa
      const dataTeamSeasons = await TeamSeason.find({ season: req.params.id });
      if (!dataTeamSeasons || dataTeamSeasons.length === 0) {
        return res.status(400).render('error', { data: "không có team nào trong mùa này" });
      }
  
      // Lấy thông tin về từng đội
      const teamIds = dataTeamSeasons.map((teamSeason) => teamSeason.team);
      const dataTeams = await Team.find({ _id: { $in: teamIds } });

      return res.status(200).render('pages/teaminseason',{
        data: {
          season: dataSeason,
          teams: dataTeams,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
   // get team in season by id
   export const getTeamInSeasonById = async (req, res) => {
    try {
      // Lấy thông tin về mùa bóng đá
      const dataSeason = await Season.findById(req.params.id);
      if (!dataSeason) {
        return res.status(400).render('error', { data: "mùa không được tìm thấy " });
      }
  
      // Lấy thông tin về các đội trong mùa
      const dataTeamSeasons = await TeamSeason.find({ season: req.params.id });
      if (!dataTeamSeasons || dataTeamSeasons.length === 0) {
        return res.status(400).render('error', { data: "không có team nào trong mùa này" });
      }
  
      // Lấy thông tin về từng đội
      const teamIds = dataTeamSeasons.map((teamSeason) => teamSeason.team);
      const dataTeams = await Team.find({ _id: { $in: teamIds } });

      return res.status(200).render('pages/newseason',{
        data: {
          season: dataSeason,
          teams: dataTeams,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  // getbyname
  export const getSeasonByName = async (req, res) => {
    try {
        const name = req.query.name.toString() || "";
        const season = await Season.findOne({ name: name });
        if (!season) {
            return res.status(404).json({
                message: "Season not found",
            });
        }
        return res.status(200).json({
            data: season,
        });
    } catch (error) {
        res.status(500).json({
            errorName: error.name,
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
      // Kiểm tra nếu có req.body
      if (!req.body) {
        return res.status(400).json({
          message: "Yêu cầu không hợp lệ",
        });
      }
  
      // Lấy thông tin về mùa bóng đá
      console.log(req.params.id);
      console.log(req.body);
      const dataSeason = await Season.findById(req.params.id);
      if (!dataSeason) {
        return res.status(404).json({
          message: "Không tìm thấy mùa bóng đá",
        });
      }
      dataSeason.name = req.body.name.trim();
      dataSeason.yearStart = req.body.yearStart;
      dataSeason.yearEnd = req.body.yearEnd;
      await dataSeason.save();
      
  
      return res.status(201).json({
        message: "Cập nhật mùa bóng đá thành công",
        data: dataSeason,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  // get name season
  export const getName = async (req,res)=> {
    let name = req.body.name.trim();
    const searchResults = await Season.find({ name: { $regex: new RegExp('^' + name + '.*', 'i') } })
      .select('_id name yearStart yearEnd')
      .limit(10)
      .exec();
    res.send({name : searchResults});
  };