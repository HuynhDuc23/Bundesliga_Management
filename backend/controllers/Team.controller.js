import TeamSeason from "../models/TeamSeason.model.js";
import Team from "../models/Team.model.js"

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
      season: idSeason
    });
    console.log(dataTeamSeasons);
    if (!dataTeamSeasons || dataTeamSeasons.length === 0) {
      return res.status(400).render('pages/error', {
        data: "không có team nào trong mùa này"
      });
    }
    // Lấy thông tin về từng đội
    const teamIds = dataTeamSeasons.map((teamSeason) => teamSeason.team);
    const dataTeams = await Team.find({
      _id: {
        $in: teamIds
      }
    });
    console.log("Data team: "+dataTeams)
    return res.status(200).render("pages/addMatch",{
      data: {
        season: idSeason,
        teams: dataTeams,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// export const getAllTeam = async (req, res) => {
//     try {
//       const teams = await Team.find();
//       if (!teams) {
//         return res.status(404).json({
//           message: "Cant not get all teams!",
//         });
//       }
//       return res.status(200).json({
//         message: "Success!",
//         data: teams,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         name: error.name,
//         message: error.message,
//       });
//     }
//   };

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

// export const createTeam = async (req, res) => {
//       try {
//         const {name,nameArena,logo,imgArena,description} = req.body;
//         const newTeam = new Team({
//             name,
//             nameArena,
//             logo,
//             imgArena,
//             description
//         });
//         await newTeam.save();
//         return res.status(201).json({
//             message:'Team created successfully',
//             team: newTeam
//         });
//       } catch (error) {
//         return res.status(500).json({message:'Failed create'})
//       }
//     }
export  const getAllTeam = async (req, res) => {
    try {
      const teams = await Team.find().sort({name:'asc'});
      if (!teams) {
        return res.status(404).json({
          message: "Cant not get all teams!",
        });
      }
      return res.status(200).render("pages/team",{
        title: "Teams",
        data: teams,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  };
  export const getAllTeamJson = async (req, res) => {
    try {
        const { existingTeamIds } = req.body;

        // Kiểm tra xem existingTeamIds có tồn tại và là một mảng không
        if (!existingTeamIds || !Array.isArray(existingTeamIds)) {
            return res.status(400).json({
                message: "Invalid data format! 'existingTeamIds' should be an array.",
            });
        }

        // Lọc các ID hợp lệ (nếu cần thiết)
        const validTeamIds = existingTeamIds.filter(id => typeof id === 'string');

        // Tìm các team không có trong danh sách các ID đã có
        const teams = await Team.find({ _id: { $nin: validTeamIds } }).sort({ name: 'asc' });
        return res.status(200).json({
            data: teams
        });
    } catch (error) {
        console.error('Error fetching teams:', error);  // Ghi log lỗi để kiểm tra
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};
  export const getTeamsByName = async (req,res) => {
    try {
      const name = req.query.name.toString() || "";
      const page = req.query.page || 0;
      const skip = page ? (page-1)*perPage : 0
      const perPage = 9;  
      const teams = await Team.find({name:{$regex:name,$options:'i'}}).skip(skip).limit(perPage).sort({name:'asc'});
      if(!teams) return res.status(404).json({
        message: "Cannot found team"
      })
      return res.status(200).json({
        data:teams
      })
    } catch (error) {
      res.status(500).json({
        errorName: error.name,
        message:error.message
      })
    }
  }
  export const createTeam = async (req, res) => {
    try {
        const { name, nameArena, logo, imgArena, description, players } = req.body;

        // Tạo đối tượng team mới từ dữ liệu nhận được từ yêu cầu
        const newTeam = new Team({
            name: name,
            nameArena: nameArena,
            logo: logo,
            imgArena: imgArena,
            description: description,
            players: players
        });

        // Lưu team mới vào cơ sở dữ liệu
        await newTeam.save();

        // Trả về thông tin về team vừa tạo thành công
        res.status(201).json(newTeam);
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình tạo team
        console.error('Error creating team:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
  export const updateTeam = async (req,res) => {
    try {
      const {id} = req.params;
      const {name,nameArena,logo,imgArena,description} = req.body
      const team = await Team.findById(id);
      if(name) team.name = name;
      if(nameArena) team.nameArena = nameArena;
      if(logo) team.logo = logo;
      if(imgArena) team.imgArena = imgArena;
      if(description) team.description = description;
      await team.save();
      return res.status(200).json({
        message:'Team updated successfully',
        data:team
      })
    } catch (error) {
      res.status(500).json({
        message:'Failed updated',
        error:error.message
      })
    }
  }
  export const deleteTeamById = async (req,res) => {
    try {
      const {id} = req.params;
      const deleted = await Team.findByIdAndDelete(id);
      if(!deleted){
        return res.status(404).json({
          message:"Team not found"
        })
      }
      const result = await Player.updateMany({team:id},{$set:{team:null}})
      if(!result) return res.status(500).json({
        message:"Deleted failed"
      })
      return res.status(200).json({
        message: "Delete successfully"
      })
     } catch (error) {
      return res.status(500).json({
        nameError: error.name,
        message: error.message
      })
    }
  }
  export const getPlayersInTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team.findById(id).populate('players');
        return res.status(200).render('pages/playerinteam', {
            team,
            players: team.players
        });
    } catch (error) {
        return res.status(500).render('error', {
            nameError: error.name,
            message: error.message
        });
    }
};
// import Team from "../models/Team.model.js"
// import Player from "../models/Player.model.js"
// export  const getAllTeam = async (req, res) => {
//     try {
//       const teams = await Team.find().sort({name:'asc'});
//       if (!teams) {
//         return res.status(404).json({
//           message: "Cant not get all teams!",
//         });
//       }
//       return res.status(200).render("pages/team",{
//         title: "Teams",
//         data: teams,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         name: error.name,
//         message: error.message,
//       });
//     }
//   };
  // export const getTeamsByName = async (req,res) => {
  //   try {
  //     const name = req.query.name.toString() || "";
  //     const page = req.query.page || 0;
  //     const skip = page ? (page-1)*perPage : 0
  //     const perPage = 9;  
  //     const teams = await Team.find({name:{$regex:name,$options:'i'}}).skip(skip).limit(perPage).sort({name:'asc'});
  //     if(!teams) return res.status(404).json({
  //       message: "Cannot found team"
  //     })
  //     return res.status(200).json({
  //       data:teams
  //     })
  //   } catch (error) {
  //     res.status(500).json({
  //       errorName: error.name,
  //       message:error.message
  //     })
  //   }
  // }
  export const getOneTeam = async (req,res) => {
    try {
      const {id} = req.params;
      const team = await Team.findById(id).populate('players')
      if(!team){
        return res.status(404).json({
          message: " Cannot find Team by Id "+id
        })
      }
      // return res.status(200).json({
      //   message:"Success!",
      //   data:team
      // })
      return res.render("pages/detailsteam",{
        message:"Success!",
        data:team
      })
    } catch (error) {
        return res.status(500).json({
          name: error.name,
          message: error.message
        })
    }
  }
  // export  const createTeam = async (req, res) => {
  //     try {
  //       const {name,nameArena,logo,imgArena,description} = req.body;
  //       const newTeam = new Team({
  //           name,
  //           nameArena,
  //           logo,
  //           imgArena,
  //           description,
  //       });
  //       await newTeam.save();
  //       return res.status(201).json({
  //           message:'Team created successfully',
  //           team: newTeam
  //       });
  //     } catch (error) {
  //       return res.status(500).json({message:'Failed create',error:error.message})
  //     }
  //   }
  // export const updateTeam = async (req,res) => {
  //   try {
  //     const {id} = req.params;
  //     const {name,nameArena,logo,imgArena,description} = req.body
  //     const team = await Team.findById(id);
  //     if(name) team.name = name;
  //     if(nameArena) team.nameArena = nameArena;
  //     if(logo) team.logo = logo;
  //     if(imgArena) team.imgArena = imgArena;
  //     if(description) team.description = description;
  //     await team.save();
  //     return res.status(200).json({
  //       message:'Team updated successfully',
  //       data:team
  //     })
  //   } catch (error) {
  //     res.status(500).json({
  //       message:'Failed updated',
  //       error:error.message
  //     })
  //   }
  // }
  // export const deleteTeamById = async (req,res) => {
  //   try {
  //     const {id} = req.params;
  //     const deleted = await Team.findByIdAndDelete(id);
  //     if(!deleted){
  //       return res.status(404).json({
  //         message:"Team not found"
  //       })
  //     }
  //     const result = await Player.updateMany({team:id},{$set:{team:null}})
  //     if(!result) return res.status(500).json({
  //       message:"Deleted failed"
  //     })
  //     return res.status(200).json({
  //       message: "Delete successfully"
  //     })
  //    } catch (error) {
  //     return res.status(500).json({
  //       nameError: error.name,
  //       message: error.message
  //     })
  //   }
  // }