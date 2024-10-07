import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { SurveysController } from './controllers/SurveysController'
import { SendMailController } from './controllers/SendMailController'

export const router = Router()

router.post('/users', new UserController().create)
router.post('/surveys', new SurveysController().create)
router.get('/surveys', new SurveysController().show)
router.post('/send-mail', new SendMailController().create)
