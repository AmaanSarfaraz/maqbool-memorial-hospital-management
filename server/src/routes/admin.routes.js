import { Router } from 'express';
import {adminLogin, adminLogout, adminRegister, changeCurrentPassword, getCurrentAdmin, updateAccountDetails, updateAdminAvatar, updateAdminCoverImage, getAllAdmins, removeAdmin } from '../controllers/admin.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { deletePatient, getAllPatients } from '../controllers/patient.controller.js'
import { getAllDoctors, getCurrentDoctor, registerDoctor, removeDoctor } from '../controllers/doctor.controller.js';
import { getAllAppointments, updateAppointment, deleteAppointment } from '../controllers/appointment.controller.js';
import { deleteDepartment, getAllDepartments, registerDepartment, updateDepartment } from '../controllers/department.controller.js';
import { deleteStaffMember, getAllStaffMembers, registerStaffMember } from '../controllers/staff.controller.js';
import { addProduct, deleteProduct, updateProduct } from '../controllers/inventory.controller.js';
import { deleteBill, getAllBills, postBilling, updateBill } from '../controllers/billing.controller.js';
import {getAllMessages} from '../controllers/message.controller.js'
import {check} from '../controllers/checkk.js'
const router = Router();
router.route('/check').get(check)
    router.route('/register').post(
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    adminRegister
);
router.route('/login').post(adminLogin);
router.route('/logout').post(verifyJWT, adminLogout);
router.route('/change/password/:id').post(verifyJWT, changeCurrentPassword);
router.route('/profile').get(verifyJWT, getCurrentAdmin)
router.route('/updatedetails').patch(verifyJWT, updateAccountDetails)
router.route('/updateavatar').patch(verifyJWT, updateAdminAvatar)
router.route('/updatecoverimage').patch(verifyJWT, updateAdminCoverImage)
router.route('/getalladmins').get(verifyJWT, getAllAdmins)
router.route('/delete/:id').delete(verifyJWT, removeAdmin)



// Patient routes
router.route('/getallpatients').get(verifyJWT, getAllPatients)
router.route('/getallpatients/delete/:id').delete(verifyJWT, deletePatient)

// Doctor routes
router.route('/register/doctor').post(
    upload.fields([
        {
            name: 'docAvatar',
            maxCount: 1
        }
    ]),
    verifyJWT,
    registerDoctor
);

router.route('/doctor/profile').get(verifyJWT, getCurrentDoctor)
router.route('/doctors').get(verifyJWT, getAllDoctors)
router.route('/doctor/delete/:id').delete(verifyJWT, removeDoctor)

// Appointment routes
router.route('/allappointments').get(verifyJWT, getAllAppointments)
router.route('/appointment/update/:id').patch(verifyJWT, updateAppointment)
router.route('/appointment/delete/:id').delete(verifyJWT, deleteAppointment)


// department routes
router.route('/add/department').post(verifyJWT, registerDepartment)
router.route('/all/departments').get(verifyJWT, getAllDepartments)
router.route('/all/departments/delete/:id').post(verifyJWT, deleteDepartment)
router.route('/all/departments/update/:id').patch(verifyJWT, updateDepartment)

// staff routes
router.route('/add/staff').post(verifyJWT, registerStaffMember)
router.route('/staff/all/members').get(verifyJWT, getAllStaffMembers)
router.route('/delete/staff/:id').delete(verifyJWT, deleteStaffMember)


//inventory routes
router.route('/add/product').post(verifyJWT, addProduct)
router.route('/delete/product/:id').delete(verifyJWT, deleteProduct)
router.route('/update/product/id').patch(verifyJWT, updateProduct)

//billing routes
router.route('/bill/generate').post(verifyJWT, postBilling)
router.route('/all/bills').post(verifyJWT, getAllBills)
router.route('/update/bill').patch(verifyJWT, updateBill)
router.route('/delete/bill/:id').delete(verifyJWT, deleteBill)

//message routes
router.get("/getAll/messages", verifyJWT, getAllMessages)



export default router;
