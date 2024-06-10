// import TeamSeason from "../models/Teamseson.model"
// export const getAllTeamSeason = async (req, res) => {
//     try {
//       const teamSeason = await TeamSeason.find();
//       if (!teamSeason) {
//         return res.status(404).json({
//           message: "Cant not get all TeamSeason!",
//         });
//       }
//       return res.status(200).json({
//         message: "Success!",
//         data: teamSeason,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         name: error.name,
//         message: error.message,
//       });
//     }
//   };
//   export const createTeamSeason = async (req, res) => {
//       try {
//         const {
//           ID_season,  ID_team
//         } = req.body;
//         const newTeamSeason = new TeamSeason({
//           ID_season, 
//           ID_team
//         });
//         await newTeamSeason.save();
//         return res.status(201).json({
//             message:'TeamSeason created successfully',
//             TeamSeason: newTeamSeason
//         });
//       } catch (error) {
//         return res.status(500).json({message:'Failed create'})
//       }
//     }