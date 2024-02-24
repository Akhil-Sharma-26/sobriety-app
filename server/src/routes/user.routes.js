import { Router } from "express";
import {
  loginUser,
  registerUser,
  fetchUserBlogs,
  fetchUserDetails,
  fetchAllBlogs,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/user-details").post(fetchUserDetails);
router.route("/user-blogs").post(fetchUserBlogs);
router.route("/all-blogs").get(fetchAllBlogs);
export default router;
