import Player from "../models/Player.model.js"
import Team from "../models/Team.model.js"
export const getAllPlayer = async (req, res) => {
    try {
      const player = await Player.find().populate('team');
      if (!player) {
        return res.status(404).json({
          message: "Cant not get all player!",
        });
      }
      return res.status(200).json({
        message: "Success!",
        data: player,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  };
  export const getOnePlayer = async (req,res) => {
    try {
      const {id} = req.params;
      const player = await Player.findById(id)
      if(!player){
        return res.status(404).json({
          message: " Cannot find Player"
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
        return res.status(500).json({message:'Failed create'})
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
