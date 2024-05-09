import Season from "../models/Season.model.js";
// import TeamSeason from "../models/TeamSeason.model.js";
// import Team from "../models/Team.model.js";

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



//   // get season by id
//   export const getSeasonById = async (req, res) => {
//     try {
//       // Lấy thông tin về mùa bóng đá
//       const dataSeason = await Season.findById(req.params.id);
//       if (!dataSeason) {
//         return res.status(400).render('error', { data: "mùa không được tìm thấy " });
//       }

//       // Lấy thông tin về các đội trong mùa
//       const dataTeamSeasons = await TeamSeason.find({ season: req.params.id });
//       if (!dataTeamSeasons || dataTeamSeasons.length === 0) {
//         return res.status(400).render('error', { data: "không có team nào trong mùa này" });
//       }

//       // Lấy thông tin về từng đội
//       const teamIds = dataTeamSeasons.map((teamSeason) => teamSeason.team);
//       const dataTeams = await Team.find({ _id: { $in: teamIds } });

//       return res.status(200).render('pages/teaminseason',{
//         data: {
//           season: dataSeason,
//           teams: dataTeams,
//         },
//       });
//     } catch (error) {
//       return res.status(500).json({
//         message: error.message,
//       });
//     }
//   };
//    // get team in season by id
//    export const getTeamInSeasonById = async (req, res) => {
//     try {
//       // Lấy thông tin về mùa bóng đá
//       const dataSeason = await Season.findById(req.params.id);
//       if (!dataSeason) {
//         return res.status(400).render('error', { data: "mùa không được tìm thấy " });
//       }

//       // Lấy thông tin về các đội trong mùa
//       const dataTeamSeasons = await TeamSeason.find({ season: req.params.id });
//       if (!dataTeamSeasons || dataTeamSeasons.length === 0) {
//         return res.status(400).render('error', { data: "không có team nào trong mùa này" });
//       }

//       // Lấy thông tin về từng đội
//       const teamIds = dataTeamSeasons.map((teamSeason) => teamSeason.team);
//       const dataTeams = await Team.find({ _id: { $in: teamIds } });

//       return res.status(200).render('pages/newseason',{
//         data: {
//           season: dataSeason,
//           teams: dataTeams,
//         },
//       });
//     } catch (error) {
//       return res.status(500).json({
//         message: error.message,
//       });
//     }
//   };
//   // delete season
//   export const deleteSeason = async (req, res) => {
//     try {
//       const dataSeasonDelete = await Season.findByIdAndDelete(req.params.id);
//       if (!dataSeasonDelete) {
//         return res.status(400).json({
//           message: "Cant not delete season",
//         });
//       }
//       await TeamSeason.deleteMany({ season: req.params.id });
//       return res.status(200).json({
//         message: "Success",
//         data: dataSeasonDelete,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         message: error.message,
//       });
//     }
//   };
//   // update season
//   export const updateSeason = async (req, res) => {
//     try {
//       // Kiểm tra nếu có req.body
//       if (!req.body) {
//         return res.status(400).json({
//           message: "Yêu cầu không hợp lệ",
//         });
//       }

//       // Lấy thông tin về mùa bóng đá
//       const dataSeason = await Season.findById(req.params.id);
//       if (!dataSeason) {
//         return res.status(404).json({
//           message: "Không tìm thấy mùa bóng đá",
//         });
//       }

//       // Kiểm tra yearStart và yearEnd
//       const { yearStart, yearEnd } = req.body;
//       if (yearStart >= yearEnd) {
//         return res.status(400).json({
//           message: "Năm bắt đầu phải nhỏ hơn năm kết thúc",
//         });
//       }

//       // Cập nhật và trả về tài liệu sau khi cập nhật
//       const updatedSeason = await Season.updateOne({ $set: req.body });
//       if (!updatedSeason) {
//         return res.status(404).json({
//           message: "Không tìm thấy mùa bóng đá để cập nhật",
//         });
//       }

//       return res.status(200).json({
//         message: "Cập nhật mùa bóng đá thành công",
//         data: updatedSeason,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         message: error.message,
//       });
//     }
//   };