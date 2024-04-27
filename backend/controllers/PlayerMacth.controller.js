import Player from "../models/Player.model.js"
import Team from "../models/Team.model.js"
import PlayerMatch from "../models/PlayerMatch.model.js"
import Match from "../models/Match.model.js"

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
export const getDetailPlayerMatch = async(req,res) => {
    try{
    const goals = [];
    const fouls = [];
    const {id} = req.params;
    const match = await Match.findById(id);
    if(!match) return res.status(404).json({
        message: "Can be not found match"
    })
    const playerMatch = await PlayerMatch.find({match:id}).populate('player');
    if(!playerMatch) return res.status(500).json({
        message: "No players in Match"
    })
    if(playerMatch[0].events){
        playerMatch.forEach((players)=>{
            const player = players.player;
            const events = players.events;
            events.forEach((event) => {
                if(event.type=='goal'){
                    goals.push({
                    team:player.team,
                    player:player.name,
                    minute:event.minutes,
                    score:event.score ? event.score : ""
                    })
                }
                if(event.type=='foul'){
                    fouls.push({
                        team:player.team,
                        player:player.name,
                        minute:event.minutes,
                        card:event.card ? event.card : ""
                    });
                }
            })
        });
    }
    return res.status(200).json({
        playerMatch,
        goals,
        fouls
    })
    } catch(e){
        return res.status(500).json({
            nameError: e.name,
            MessageError: e.message,
            message:"Error fetching match details"
        })
    }
};