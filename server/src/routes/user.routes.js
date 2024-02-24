import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";


const router = Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/user-details').post(fetchUserDetails)
router.route('/user-blogs').post(fetchUserBlogs)


export default router