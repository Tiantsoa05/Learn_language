import {Router} from 'express'
import { createAgenda, listPrograms } from '../controllers/Profs/AgendaController.js'

const router = Router()

router.get('/all/:id_prof',listPrograms)
router.post('/new',createAgenda)

export default router