import Team from "../models/Team.model.js"
export const checkTeam = async (req,res,next) => {
    try {
        const {team} = req.body;
        const result = await Team.findById(new ObjId(team));
        if(!result) return res.status(404).json({
            name:"error",
            message:"Team does not exit!",
            data:team,
        })
        next();
    } catch (error) {
        return res.status(500).json({
            error_name:error.name,
            message:error.message
        })
    }
}