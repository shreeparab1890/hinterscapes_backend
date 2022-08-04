import express from "express";
const router = express.Router();

import {
  signup,
  signin,
  googleSignin,
  googleSignup,
  collectEmail,
  confirmEmail,
} from "../controllers/user.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleSignin", googleSignin);
router.post("/googleSignup", googleSignup);
router.post("/email", collectEmail);
router.get("/email/confirm/:id", confirmEmail);

export default router;
