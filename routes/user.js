import express from "express";
const router = express.Router();

import {
  signup,
  signin,
  googleSignin,
  googleSignup,
} from "../controllers/user.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleSignin", googleSignin);
router.post("/googleSignup", googleSignup);

export default router;
