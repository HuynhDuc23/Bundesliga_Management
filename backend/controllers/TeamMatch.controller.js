import TeamMatch from "../models/TeamMatch.model.js"
import Season from "../models/Season.model.js"
import Match from "../models/Match.model.js"
export const getTeamMatchByIdMatch = async(req,res) => {
    try {
        const {id} = req.params;
    const result = await TeamMatch.find({match:id}).populate('team').populate('match')
   if(!result||result.length==0){
        res.status(404).json({
            message: "Cannot find team match"
        })
    }
    return res.status(200).json({
        data:result
    })        
    } catch (error) {
        return res.status(500).json({
            errorName: error.name,
            message:error.message
        })
    }
}
export const addTeamMatch = async(req,res) => {
    try {
        const {team,match,score,status} = req.body;
    const newTeamMatch = new TeamMatch({
        team,
        match,
        score,
        status
    })
    await newTeamMatch.save();
    return res.status(200).json({
        message:"Add team match successfully",
        data:newTeamMatch
    })        
    } catch (error) {
        return res.status(500).json({
            errorName: error.name,
            message:error.message
        })
    }
}
export const getDetailsTeamMatch = async(req,res) => {
    try {
        const nameSeason = req.query.name
        const infoMatchs = []
        const season = await Season.find({name:nameSeason});
        if (!season) {
          return res.status(400).json({
            error:true,
            message: "Cannot found season",
          });
        }
        const idSeason = season[0].id;
        const match = await Match.find({season:idSeason})
        if(!match) return res.status(404).json({
            error:true,
            message:"Not match in Season"
        })
        await Promise.all(match.map(async (match) => {
            const result = await TeamMatch.find({match:match.id}).populate('team')
            if(result.length>0){
                console.log("abc")
                infoMatchs.push({
                    date:match.date,
                    description:match.description,
                    stadium:match.stadium,
                    team1:{
                        data:result[0]
                    },
                    team2:{
                        data:result[1]
                    }
                })
            }
        }))
        return res.status(200).json({
            error:false,
            data:infoMatchs
        })
      } catch (error) {
        return res.status(500).json({
          nameError: error.name,
          message: error.message,
        });
      }
}