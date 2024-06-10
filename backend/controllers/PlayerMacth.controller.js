import Player from "../models/Player.model.js"
import Team from "../models/Team.model.js"
import PlayerMatch from "../models/PlayerMatch.model.js"
import Match from "../models/Match.model.js"
import TeamMatch from "../models/TeamMatch.model.js"
import Season from "../models/Season.model.js"
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
    const result = goals.map(goal => ({ ...goal, minutes: [...goal.minutes] }));
    for (let i = 0; i < result.length - 1; i++) {
        for (let j = i + 1; j < result.length; j++) {
            if (result[i].playerName === result[j].playerName) {
                result[i].minutes = [...result[i].minutes, ...result[j].minutes];
                result[j].playerName = "none";
            }
        }
    }
    return result;
};

const compareFouls = (fouls) => {
    const result = fouls.map(foul => ({ ...foul, minutes: [...foul.minutes], card: [...foul.card] }));
    for (let i = 0; i < result.length - 1; i++) {
        for (let j = i + 1; j < result.length; j++) {
            if (result[i].playerName === result[j].playerName) {
                result[i].card = [...result[i].card, ...result[j].card];
                result[i].minutes = [...result[i].minutes, ...result[j].minutes];
                result[j].playerName = "none";
            }
        }
    }
    return result;
};
const concatAndSortByMinutes = (arr1,arr2) => {
    return [...arr1,...arr2].sort((a,b)=>{
        if(a.minutes[0]<b.minutes[0]) return -1;
        if(a.minutes[0]>b.minutes[0])  return 1;
        return 0;
    })
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
                                            type:"goal",
                                            playerName:pl.name,
                                            minutes:[e.minutes],
                                            nameTeam:t.team.name,
                                            logoTeam:t.team.logo,
                                            shirtNumber:pl.shirtNumber
                                            }
                                        )
                                    }else if(e.type=="foul"){
                                        foulTeam1.push({
                                            type:"foul",
                                            playerName:pl.name,
                                            minutes:[e.minutes],
                                            card:[e.card?e.card:""],
                                            nameTeam:t.team.name,
                                            logoTeam:t.team.logo,
                                            shirtNumber:pl.shirtNumber
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
                                            type:"goal",
                                            playerName:pl.name,
                                            minutes:[e.minutes],
                                            nameTeam:t.team.name,
                                            logoTeam:t.team.logo,
                                            shirtNumber:pl.shirtNumber
                                            }
                                        )
                                    }else if(e.type=="foul"){
                                        foulTeam2.push({
                                            type:"foul",
                                            playerName:pl.name,
                                            minutes:[e.minutes],
                                            card:[e.card?e.card:""],
                                            nameTeam:t.team.name,
                                            logoTeam:t.team.logo
                                            ,shirtNumber:pl.shirtNumber
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
        console.log("-------------Goals------")
        const goals = concatAndSortByMinutes(goalTeam1,goalTeam2);
        const fouls = concatAndSortByMinutes(foulTeam1,foulTeam2);
        for(var i = 0 ; i < fouls.length-1 ;i++){
            if(fouls[i].card=='yellow'){     
                for(var j = i+1 ; j < fouls.length; j++){
                    if(fouls[i].playerName==fouls[j].playerName&&fouls[j].card=='yellow'){
                        console.log("abc")
                        fouls[j] = {type:"foul",playerName:fouls[j].playerName,minutes:fouls[j].minutes,card:
                            fouls[j].card,shirtNumber:fouls[j].shirtNumber,nameTeam:fouls[j].nameTeam,logoTeam:fouls[j].logoTeam
                        ,out:true}
                    }
                }
            }
        }
        const listEvents = concatAndSortByMinutes(goals,fouls);
        console.log(listEvents)
        console.log("----------------------------")
        const updatedGoalTeam1 = compareGoals(goalTeam1);
        const updatedGoalTeam2 = compareGoals(goalTeam2);
        goalTeam1 = updatedGoalTeam1.filter(e => e.playerName !== 'none');
        goalTeam2 = updatedGoalTeam2.filter(e => e.playerName !== 'none');
        const updatedFoulTeam1 = compareFouls(foulTeam1);
        const updatedFoulTeam2 = compareFouls(foulTeam2);
        foulTeam1 = updatedFoulTeam1.filter(e => e.playerName !== 'none');
        foulTeam2 = updatedFoulTeam2.filter(e => e.playerName !== 'none');
        console.log("--check last")
        console.log(listEvents)
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
            },
            listEvents: listEvents
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Server Error",
            reason:error.message,
        })
    }
};
export const getEditMatch = async (req,res) => {
    try {
        const nameSeason = req.query.name || ""
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
        const matchs = await Match.find({season:idSeason}).sort({date:1})
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
            list:seasons,
            selectedSeason:season.name,
            matches:detailsMatch
        })
        // return res.status(200).json({
        //     match:detailsMatch
        // })
    } catch (error) {
        return res.status(500).json({
            reason:error.message,
            message:"Server Error",
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
            info:detailMatch,
            playerSelect:null,
            type:'',
            minute:0,
            action:'',
            card:''
        })
    } catch (error) {
        return res.status(500).json({
            message:"Server Error",
            season:error.message
        })
    }
}
export const checkConstraint = async (req, res, next) => {
    try {
        let totalYellowCard = 0;
        let totalRedCard = 0;
        const { id } = req.params;
        const { idPlayer, type, minute, action, card } = req.body;
        let listEventsMatch = [];
        const player = await Player.findById(idPlayer);
        if (!player) {
            return res.status(404).json({

                error: true,
                message: "Player not found",
                matches: [],
                info: []
            });
        }
        const matches = await Match.findById(id).populate('players');
        const detailMatch = await TeamMatch.find({ match: id }).populate('team');
        const playerInMatch = await Player.find({'matchs.idMatch':id});
        playerInMatch.forEach(player => {
            const eventMatch = player.matchs.find(match => match.idMatch.toString()==id);
            if(eventMatch){
                listEventsMatch = listEventsMatch.concat(eventMatch.events);
            }
        })
        for (const e of listEventsMatch) {
            if (minute <= e.minutes) {
                return res.render('pages/editevent', {
                    error: true,
                    message: `Thêm sự kiện thất bại, thời gian thêm ${type.toUpperCase()} không hợp lệ`,
                    matches: matches,
                    info: detailMatch,
                    playerSelect: player._id,
                    type: type,
                    minute: minute,
                    action: action,
                    card: card
                });
            }
        }
        const match = player.matchs.find(dMatch => dMatch.idMatch == id);
        if (!match) {
            return res.render('pages/error_page',{
                error: true,
                message: "Match not found",
                matches: [],
                info: [],
            });
        }
        match.events.forEach(e => {
            if (e.type == 'foul') {
                if (e.card == 'yellow') {
                    totalYellowCard++;
                } else if (e.card == 'red') {
                    totalRedCard++;
                }
            }
        });
            if(totalRedCard>=1){
                return res.render('pages/editevent', {
                    error: true,
                    message: "Thêm sự kiện thất bại, cầu thủ này đã nhận thẻ đỏ",
                    matches: matches,
                    info: detailMatch,
                    playerSelect:player._id,
                    type:type,
                    minute:minute,
                    action:action,
                    card:card
                });
            }
            for (const e of match.events) {
                if (type == 'goal' && minute <= e.minutes) {
                    return res.render('pages/editevent', {
                        error: true,
                        message: "Thời gian thêm bàn thắng cho trận đấu không hợp lệ",
                        matches: matches,
                        info: detailMatch,
                        playerSelect:player._id,
                        type:type,  
                        minute:minute,
                        action:action,
                        card:card
                    });
                } else if (type == 'foul' && minute <= e.minutes) {
                    return res.render('pages/editevent', {
                        error: true,
                        message: "Thời gian thêm thẻ phạt cho trận đấu không hợp lệ",
                        matches: matches,
                        info: detailMatch,
                        playerSelect:player._id,
                        type:type,
                        minute:minute,
                        action:action,
                        card:card
                    });
                }
            }

        if (type == 'foul') {
            if (totalRedCard >= 1) {
                return res.render('pages/editevent', {
                    error: true,
                    message: "Thêm thẻ phạt thất bại, cầu thủ này đã nhận thẻ đỏ",
                    matches: matches,
                    info: detailMatch,
                    playerSelect:player._id,
                    type:type,
                    minute:minute,
                    action:action,
                    card:card
                });
            } else if (totalYellowCard >= 2) {
                return res.render('pages/editevent', {
                    error: true,
                    message: "Thêm thẻ phạt thất bại, cầu thủ này đã nhận 2 thẻ vàng",
                    matches: matches,
                    info: detailMatch,
                    playerSelect:player._id,
                    type:type,
                    minute:minute,
                    action:action,
                    card:card
                });
            }
        }

        // Không gọi next() ở đây
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
    next(); // Gọi next() ở cuối cùng của try-catch
};
export const editPlayerMatch = async (req,res) => {
    try {
        const {id} = req.params;
        const {idPlayer,type,minute,action,card} = req.body;
        console.log(idPlayer,type,minute,action);
        const player = await Player.findById(idPlayer);
        if(!player) return res.status(404).json({
            message: "Player not found"
        })
        // Constain 
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
        const matchCanUpdate = player.matchs.find(dMatch => dMatch.idMatch == id);
                if(type=='goal'){
                    player.goal++;
                }
                matchCanUpdate.events = [...matchCanUpdate.events,newEvent];
                console.log("Player: "+player)
                const playerUpdate = await player.save();
                if(playerUpdate!==null){
                    if(type=='goal'){
                        for(const team of teamsMatch){
                            if(team.team.players.includes(idPlayer)){
                                team.goal++;
                                await team.save();
                                break;
                            }
                        }
                    }
                    return res.redirect('/api/v1/teammatch')    
                }
                else return res.status(404).json({
                message:"Update Error"})
        return res.status(404).json({ message: "Match not found" });
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}