import { Router} from "express";
import { getFollowersNumber, getFollowerStudents } from "../controllers/StudentControllers.js";

const router = Router();

router.get('/followers/:id_prof', getFollowerStudents)
router.get('/number/:id_prof',getFollowersNumber)

export default router