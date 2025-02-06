import { Router } from 'express'
import { doctorLogin, doctorLogout, getAllDoctors, getCurrentDoctor } from "../controllers/doctor.controller.js"
import { doctorVerifyJWT } from "../middlewares/auth.doctor.middleware.js"

const router = Router()
router.route('/login').post(doctorLogin)
router.route('/profile').get(doctorVerifyJWT, getCurrentDoctor)
router.route('/all/doctors').get(getAllDoctors)
router.route('/logout').post(doctorVerifyJWT, doctorLogout)

export default router