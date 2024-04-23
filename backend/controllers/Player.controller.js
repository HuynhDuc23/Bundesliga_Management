import Player from "../models/Player.model"
export const getAllPlayer = async (req, res) => {
    try {
      const player = await Player.find();
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
  export const createPlayer = async (req, res) => {
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