import express from "express";
const router = express.Router();

import {
  signup,
  signin,
  googleSignin,
  googleSignup,
  collectEmail,
  emailVerify,
  confirmEmail,
  getUser,
  updateuser,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleSignin", googleSignin);
router.post("/googleSignup", googleSignup);
router.post("/email", collectEmail);
router.post("/email/verify", emailVerify);
router.get("/email/confirm/:id", confirmEmail);
router.get("/:id", auth, getUser);
router.patch("/user/:id", auth, updateuser);

export default router;
