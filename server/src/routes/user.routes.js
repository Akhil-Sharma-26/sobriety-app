import { Router } from "express";
import {
    loginUser,
    registerUser,
    fetchUserDetails,
    fetchUserBlogs,
    resetUser,
    getStreak,
    checkIn,
    fetchAllBlogs,
    getStreakInfo
} from "../controllers/user.controllers.js";

const router = Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/user-details').post(fetchUserDetails)
router.route('/user-blogs').post(fetchUserBlogs)
router.route('/reset').post(resetUser)
router.route('/streak').post(getStreak)
router.route('/checkin').post(checkIn)
router.route("/all-blogs").get(fetchAllBlogs);
router.route('/streak-info').post(getStreakInfo)


export default router;
