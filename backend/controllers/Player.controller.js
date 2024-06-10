
import Player from "../models/Player.model.js"
import Team from "../models/Team.model.js"
import TeamMatch from "../models/TeamMatch.model.js"
import Match from "../models/Match.model.js"
export const getAllPlayer = async (req, res) => {
    try {
      const page = parseInt(req.body.page) || 1;
      const limit = parseInt(req.body.limit) || 10;
      const player = await Player.find().skip((page-1)*limit).limit(limit).exec();
      if (!player) {
        return res.status(404).json({
          message: "Cant not get all player!",
        });
      }
      const count = await Player.countDocuments();
      const totalPage = Math.ceil(count / limit);
      return res.render('pages/player',({
        data:player,
        totalPlayers:count,
        totalPages : totalPage,
        currentPage : page
      }))
      // return res.status(200).json({
      //   message: "Success!",
      //   data: player,
      // });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  };
  export const getOnePlayer = async (req,res) => {
    try {
      const page = parseInt(req.params.page)||1;
      const limit = parseInt(req.params.limit)||4;
      let infoMatch = [];
      const {id} = req.params;
      const player = await Player.findById(id)
      if(!player){
        return res.status(404).json({
          message: " Cannot find Player"
        })
      }
      let team = null;
      team = await Team.findOne({players:player._id});
      const count = player.matchs.length;
      const totalPage = Math.ceil(count / limit);
      for(const pl of player.matchs){
        const info = await TeamMatch.find({match:pl.idMatch}).populate('team').skip((page-1)*limit).limit(limit).exec();
        const match = await Match.findById(pl.idMatch);
        infoMatch.push({
          idMatch:match._id,
          description:match.description,
          date:match.date,
          data:info
        })
      }
      // return res.status(200).json({
      //   message:"Success!",
      //   datas:player,
      //   team:team,
      //   info:infoMatch,
      //   totalPages:totalPage,
      //   currentPage:page
      // })
      return res.render('pages/detailsplayer',{
        data:player,
        team:team,
        info:infoMatch,
        totalPages:totalPage,
        currentPage:page
      })
    } catch (error) {
        return res.status(500).json({
          name: error.name,
          message: error.message
        })
    }
  }
  export const getPlayerByIdTeam = async (req,res) => {
    try {
      const {idTeam} = req.params;
      const player = await Player.find({
        team:idTeam
      })
      if(!player){
        return res.status(404).json({
          message: "Player not found"
        })
      }
      return res.status(200).json({
        message:"Success!",
        datas:player
      })
    } catch (error) {
        return res.status(500).json({
          name: error.name,
          message: error.message
        })
    }
  }
  export  const createPlayer = async (req, res) => {
      try {
        const {
        name,heigh,weight,shirtNumber,shirtSize,goal,team
        } = req.body;

        const newPlayer = new Player({
            name,
            heigh,
            weight,
            shirtNumber,
            shirtSize,
            goal,
            team
        });
        await newPlayer.save();
        return res.status(201).json({
            message:'Player created successfully',
            player: newPlayer
        });
      } catch (error) {
        return res.status(500).json({message:'Failed create',name_error : error.name,error_message: error.message})
      }
}
export const updatePlayer = async (req,res) => {
  try {
    const {id} = req.params;
    const {name,heigh,weight,shirtNumber,shirtSize,goal,team} = req.body
    const player = await Player.findById(id);
    if(name) player.name = name;
    if(heigh) player.heigh = heigh;
    if(weight) player.weight = weight;
    if(shirtNumber) player.shirtNumber = shirtNumber;
    if(shirtSize) player.shirtSize = shirtSize;
    if (goal) player.goal = goal;
    if(team) player.team = team;
    await player.save();
    return res.status(200).json({
      message:'Player updated successfully',
      data:player
    })
  } catch (error) {
    res.status(500).json({
      message:'Failed updated',
      error:error.message
    })
  }
}
export const getEventsByMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const {playerId} = req.body;
    console.log("Player id:"+playerId)
    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ error: true, message: 'Player not found' });

    // Tìm trận đấu trong danh sách matchs của player
    const match = player.matchs.find(match => match.idMatch.toString() === id);
    if (!match) return res.status(404).json({ error: true, message: 'Match not found' });
    console.log(match.events)
    // Sắp xếp sự kiện theo phút
    const events = match.events.sort((a, b) => a.minutes - b.minutes);
    return res.status(200).json({
      error: false,
      data: events // Trả về danh sách sự kiện
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: e.message
    });
  }
}
////////////////////////////////////////////////////////////////
export const getAllPlayersWithStatusZero = async (req, res) => {
  try {
      // Lấy tất cả các cầu thủ có status = 0 từ cơ sở dữ liệu
      const players = await Player.find({ status: 0 });
      // Trả về JSON chứa danh sách các cầu thủ
      return res.status(201).json({
          data: players,
      });
  } catch (error) {
      // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình lấy dữ liệu
      console.error('Error getting players:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
export const updatePlayerStatus = async (req, res) => {
  try {
      const { playerIds } = req.body;

      // Cập nhật status của các player có trong playerIds từ 0 sang 1
      await Player.updateMany(
          { _id: { $in: playerIds } },
          { $set: { status: 1 } }
      );

      res.status(200).json({ message: 'Player status updated successfully' });
  } catch (error) {
      console.error('Error updating player status:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};