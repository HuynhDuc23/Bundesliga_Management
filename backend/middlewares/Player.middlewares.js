import mongoose from "mongoose";
import Team from "../models/Team.model.js"
const {Types} = mongoose;
export const checkTeam = async (req,res,next) => {
    try {
        const {team} = req.body;
        const teamObjectId = Types.ObjectId.isValid(team) ? new Types.ObjectId(team) : null;
        const result = await Team.findById(teamObjectId);
        if (!teamObjectId) {
            return res.status(400).json({
                name: "error",
                message: "Invalid team ID format!",
                data: team,
            });
        }
        if(!result) return res.status(404).json({
            name:"error",
            message:"Team does not exit!",
        })
        next();
    } catch (error) {
        return res.status(500).json({
            error_name:error.name,
            message:error.message
        })
    }
}