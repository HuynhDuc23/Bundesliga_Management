import Team from "../models/Team.model.js"
import Player from "../models/Player.model.js"
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
  export const getOneTeam = async (req,res) => {
    try {
      const {id} = req.params;
      const team = await Team.findById(id).populate('players')
      if(!team){
        return res.status(404).json({
          message: " Cannot find Team by Id "+id
        })
      }
      return res.status(200).json({
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
  export  const createTeam = async (req, res) => {
      try {
        const {name,nameArena,logo,imgArena,description} = req.body;
        const newTeam = new Team({
            name,
            nameArena,
            logo,
            imgArena,
            description,
        });
        await newTeam.save();
        return res.status(201).json({
            message:'Team created successfully',
            team: newTeam
        });
      } catch (error) {
        return res.status(500).json({message:'Failed create',error:error.message})
      }
    }
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