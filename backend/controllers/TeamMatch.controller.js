import TeamMatch from "../models/TeamMatch.model.js"
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