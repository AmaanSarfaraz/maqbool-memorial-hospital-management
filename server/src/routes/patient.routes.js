import { Router } from 'express';
import { patientVerifyJWT } from '../middlewares/auth.patient.middleware.js'
import { patientLogin, patientLogout, patientRegister, getCurrentPatient, changeCurrentPassword } from '../controllers/patient.controller.js';
import { deleteAppointment, getPatientAppointments, postAppointment, updateAppointment, getAllAppointments } from '../controllers/appointment.controller.js';

const router = Router()

router.route('/register').post(patientRegister)
router.route('/login').post(patientLogin)
router.route('/logout').post(patientVerifyJWT, patientLogout)
router.route('/profile').get(patientVerifyJWT, getCurrentPatient)
router.route('/change/password/:id').post(patientVerifyJWT, changeCurrentPassword);


// appointmet routes
router.route('/appointment').post(patientVerifyJWT, postAppointment)
router.route('/appointment/delete/:id').delete(patientVerifyJWT, deleteAppointment)
router.route('/appointment/me/:id').get(patientVerifyJWT, getPatientAppointments)
router.route('/allappointments').get(patientVerifyJWT, getAllAppointments)


export default router;