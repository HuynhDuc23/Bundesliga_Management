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
function formatDate(date){
    return date.toDateString();
}
// function uniqueByDate(array) {
//     const seen = new Set();
//     return array.filter(obj => {
//       const date = obj.date;
//       if (!seen.has(date)) {
//         seen.add(date);
//         return true;
//       }
//       return false;
//     });
//   }
  function compareObjects(obj1, obj2) {
    return obj1.date.getTime() === obj2.date.getTime();
}
export const getDetailsTeamMatch = async(req,res) => {
    try {
        const nameSeason = req.query.name || ""
        const infoMatchs = []
        const seasons = [];
        const listSeason =  await Season.find().sort({yearEnd:-1})
        if(listSeason.length>0){
            listSeason.forEach((season) => {
                seasons.push({
                    name:season.name,
                    yearStart:season.yearStart,
                    yearEnd:season.yearEnd
                })
            })
        }
        var season;
        if(!nameSeason){
            season = listSeason[0];
            console.log("check")
        }else{
            season = await Season.findOne({name:nameSeason});
            console.log(nameSeason)
        }
        console.log(season)
        if (!season) {
          return res.status(400).json({
            error:true,
            message: "Cannot found season",
          });
        }
        const idSeason = season._id;
        const match = await Match.find({season:idSeason}).sort({date:1})
        if(!match) return res.status(404).json({
            error:true,
            message:"Not match in Season"
        }) 
        await Promise.all(match.map(async (match) => {
            const result = await TeamMatch.find({match:match.id}).populate('team')
            if(result.length>0){
                infoMatchs.push({
                    idMatch:match._id,
                    date:formatDate(match.date),
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
        var listDatesMatch = [];
        match.forEach((e)=>{
            listDatesMatch.push({
                date:e.date
            })
        })
        listDatesMatch = listDatesMatch.filter((obj, index, self) =>
            index === self.findIndex((t) => (
                compareObjects(t, obj)
            ))
        );        
        for(var j = 1 ; j <= listDatesMatch.length ; j++){
            listDatesMatch[j-1].key = "match"+j;
        }
        var lengthMatch = listDatesMatch.length;
        const groupedMatches = {};
        infoMatchs.forEach((match)=>{
            var key = "";
            listDatesMatch.forEach((e)=>{
                if(match.date===formatDate(e.date)){
                   key = e.key; 
                }
            })
            if(!groupedMatches[key]){
                groupedMatches[key] = [];
            }
            groupedMatches[key].push(match);
        })
        return res.render("pages/match",{
            error:false,
            length:lengthMatch,
            selectedSeason:season.name,
            list:seasons,
            data:groupedMatches
        })
        // return res.status(200).json({
        //     error:false,
        //     selectedSeason:season.name,
        //     length:lengthMatch,
        //     list:seasons,
        //     data:groupedMatches
        // })
      } catch (error) {
        return res.status(500).json({
          nameError: error.name,
          message: error.message,
        });
      }
}