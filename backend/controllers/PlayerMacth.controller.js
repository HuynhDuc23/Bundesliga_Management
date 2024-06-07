import Player from "../models/Player.model.js"
import Team from "../models/Team.model.js"
import PlayerMatch from "../models/PlayerMatch.model.js"
import Match from "../models/Match.model.js"
import TeamMatch from "../models/TeamMatch.model.js"
import mongoose from "mongoose"
export const createPlayerMatch = async(req,res) => {
    try {
        const {match,player,events} = req.body
        const getEvents = events.length > 0 ? events : []
        const newPlayerMatch = new PlayerMatch({
            match,
            player,
            events:getEvents
        });
        await newPlayerMatch.save();
        res.status(201).json({
            message:"Add player match successfully"
            ,events:events
        })
    } catch (error) {
        return res.status(500).json({
            nameError:error.name,
            messageError:error.message,
            message:"Add player match failed"
        })
    }
}
const compareGoals = (goals) => {
    for(var i = 0 ; i < goals.length-1;i++){
        for(var j = i + 1 ; j < goals.length; j++){
            if(goals[i].playerName==goals[j].playerName){
                goals[i].minutes = [...goals[i].minutes,...goals[j].minutes];
                goals[j].playerName = "none";
            }
        }
    }
}
const compareFouls = (fouls) => {
    for(var i = 0; i < fouls.length-1; i++){
        for(var j = i+1; j < fouls.length; j++){
            if(fouls[i].playerName==fouls[j].playerName){
                fouls[i].card = [...fouls[i].card,...fouls[j].card];
                fouls[i].minutes = [...fouls[i].minutes,...fouls[j].minutes];
                fouls[j].playerName = "none";
            }
        }
    }
}
export const getDetails = async (req,res) => {
    try {
        const {id} = req.params;
        const match = await Match.findById(id).populate('players');
        var goalTeam1 = [];
        var goalTeam2 = [];
        var foulTeam1 = [];
        var foulTeam2 = [];
        var dataTeam1 = {};
        var dataTeam2 = {};
        var totalGoalTeam1 = 0;
        var totalGoalTeam2 = 0;
        if(!match) return res.status(404).json({
            message:"Match not found"
        });
        const teamsInMatch = await TeamMatch.find({match:id}).populate('team')
        if(!teamsInMatch) return res.status(404).json({
            message:"Not teams in Match"
        })
        const idTeam1 = teamsInMatch[0].team._id;
        // match.players.forEach(e => {
        //     console.log(e._id)
        // })
       teamsInMatch.forEach(t => { 
            console.log("check :"+t.team._id)
            if(t.team._id==idTeam1){
                dataTeam1 = {
                    name:t.team.name,
                    logo:t.team.logo,
                    description:t.team.description
                }
                match.players.forEach(pl => {
                    if(t.team.players.indexOf(pl._id)>=0){
                        console.log("yes: "+pl._id)
                        pl.matchs.forEach(m => {
                            if(m.idMatch==id){
                                m.events.forEach(e => {
                                    if(e.type=="goal"){
                                        totalGoalTeam1++;
                                        goalTeam1.push({
                                            playerName:pl.name,
                                            minutes:[e.minutes]
                                            }
                                        )
                                    }else if(e.type=="foul"){
                                        foulTeam1.push({
                                            playerName:pl.name,
                                            minutes:[e.minutes],
                                            card:[e.card?e.card:""]
                                        })
                                    }
                                })
                            }
                        })
                    }
            }
            )
            }else{
                dataTeam2 = {
                    name:t.team.name,
                    logo:t.team.logo,
                    description:t.team.description
                }
                match.players.forEach(pl => {
                    if(t.team.players.indexOf(pl._id)>=0){
                        console.log("yesb: "+pl._id)
                        pl.matchs.forEach(m => {
                            if(m.idMatch==id){
                                m.events.forEach(e => {
                                    if(e.type=="goal"){
                                        totalGoalTeam2++;
                                        goalTeam2.push({
                                            playerName:pl.name,
                                            minutes:[e.minutes]
                                            }
                                        )
                                    }else if(e.type=="foul"){
                                        foulTeam2.push({
                                            playerName:pl.name,
                                            minutes:[e.minutes],
                                            card:[e.card?e.card:""]
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
        compareGoals(goalTeam1);
        compareGoals(goalTeam2);
        goalTeam1 = goalTeam1.filter(e => e.playerName != 'none');
        goalTeam2 = goalTeam2.filter(e => e.playerName != 'none');
        compareFouls(foulTeam1);
        compareFouls(foulTeam2);
        foulTeam1 = foulTeam1.filter(e => e.playerName != 'none');
        foulTeam2 = foulTeam2.filter(e => e.playerName != 'none');
        return res.status(201).render("pages/detailsmatch",{
            match:match,
            team1:{
                info:dataTeam1,
                totalGoal:totalGoalTeam1,
                dataGoal:goalTeam1,
                dataFould:foulTeam1
            },
            team2:{
                info:dataTeam2,
                totalGoal:totalGoalTeam2,
                dataGoal:goalTeam2
                ,dataFould:foulTeam2
            }
        })
        //         return res.status(201).json({
        //     match:match,
        //     team1:{
        //             info:dataTeam1,
        //         totalGoal:totalGoalTeam1,
        //         dataGoal:goalTeam1,
        //         dataFould:foulTeam1
        //     },
        //     team2:{
        //            info:dataTeam2,
        //         totalGoal:totalGoalTeam2,
        //         dataGoal:goalTeam2
        //         ,dataFould:foulTeam2
        //     }
        // })
    } catch (error) {
        return res.status(500).json({
            message:"Server Error",
            reason:error.message,
        })
    }
};
export const getEditMatch = async (req,res) => {
    try {
        const matchs = await Match.find();
        if(!matchs) return res.status(404).json({
            message:"Matchs not found"
        })
        const detailsMatch = await Promise.all(matchs.map(async (match) => {
            const info = await TeamMatch.find({ match: match._id }).populate('team');
            return {
                match,
                details: info
            };
        }));
        return res.render("pages/matchedits",{
            matches:detailsMatch
        })
        // return res.status(200).json({
        //     match:detailsMatch
        // })
    } catch (error) {
        return res.status(500).json({
            reason:error.message,
            message:"Server Error",
            abc:"abc"
        })
    }
}   
export const getEditEvent = async (req,res) => {
    try {
        const {id} = req.params;
        const match = await Match.findById(id).populate('players');
        const detailMatch = await TeamMatch.find({match:match._id}).populate('team');
        return res.render("pages/editevent.ejs",{
            matches:match,
            info:detailMatch
        })
    } catch (error) {
        return res.status(500).json({
            message:"Server Error",
            season:error.message
        })
    }
}
export const editPlayerMatch = async (req,res) => {
    try {
        const {id} = req.params;
        const {idPlayer,type,minute,action,card} = req.body;
        console.log(idPlayer,type,minute,action);
        const player = await Player.findById(idPlayer);
        if(!player) return res.status(404).json({
            message: "Player not found"
        })
        const teamsMatch = await TeamMatch.find({match:id}).populate('team');
        console.log(teamsMatch)
        let newEvent;
        if(type=='goal'){
            newEvent = {
                type:type,
                minutes:minute,
                action:action,
            }   
        }else{
            newEvent = {
                type,
                minutes:minute,
                action,
                card:card ? card : ""
            }
        }
        for(const m of player.matchs){
            if(m.idMatch==id){
                m.events = [...m.events,newEvent];
                const playerUpdate = await player.save();
                if(playerUpdate!==null){
                    if(type=='goal'){
                        for(const team of teamsMatch){
                            if(team.team.players.includes(idPlayer)){
                                team.goal++;
                                await team.save();
                            }
                        }
                    }
                    return res.redirect('/api/v1/teammatch')    
                }
                else res.status(404).json({
                message:"Update Error"})
            }
        }
        return res.status(404).json({ message: "Match not found" });
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}