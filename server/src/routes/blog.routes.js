import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { getAllBlogs, createBlog, getCurrentBlog, updateBlog, deleteBlog } from "../controllers/blog.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {doctorVerifyJWT} from "../middlewares/auth.doctor.middleware.js"
import { patientVerifyJWT } from '../middlewares/auth.patient.middleware.js'
const router = Router()

router.route('/all/blogs').get(getAllBlogs)
router.route('/admin/create').post(
    verifyJWT,
    upload.fields([
        {
            name: 'image',
            maxCount: 1
        }
    ]),
    createBlog)
router.route('/patient/create').post(
    patientVerifyJWT,
    upload.fields([
        {
            name: 'image',
            maxCount: 1
        }
    ]),
    createBlog)
router.route('/doctor/create').post(
    doctorVerifyJWT,
    upload.fields([
        {
            name: 'image',
            maxCount: 1
        }
    ]),
    createBlog)
router.route('/update/:id').put(updateBlog)
router.route('/get/:id').get(getCurrentBlog)
router.route('/delete/:id').delete(deleteBlog)

export default router