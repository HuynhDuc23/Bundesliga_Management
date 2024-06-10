import { Router } from "express";
import {
getAllSeasonMatch,
createSeason,
getAllSeason,
getSeasonById,
updateSeason,
deleteSeason,
getTeamInSeasonById,
getSeasonByName,
getName
  } from "../controllers/Season.controllers.js";
// const seasonRouter = Router();

// export default seasonRouter;
// import { Router } from "express";
const seasonRouter = Router();
seasonRouter.get('/getallseasonmatch',getAllSeasonMatch); 
seasonRouter.post('/',createSeason);
seasonRouter.post('/getName',getName);
seasonRouter.get('/',getAllSeason);
seasonRouter.get('/:id',getSeasonById);
seasonRouter.get('/findByNameSeason/:name',getSeasonByName);
seasonRouter.get('/newSeason/:id',getTeamInSeasonById);
seasonRouter.put('/:id',updateSeason);
seasonRouter.delete('/:id',deleteSeason);
// export default seasonRouter;
// import { Router } from "express";
// import { createSeason,getAllSeason,updateSeason} from "../controllers/Season.controller.js"
// const seasonRouter = Router();
// seasonRouter.post("/",createSeason)
// seasonRouter.get("/",getAllSeason)
export default seasonRouter;