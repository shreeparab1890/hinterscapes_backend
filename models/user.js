import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  email_verified: { type: Boolean, required: true, default: false },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
  id: { type: String },
});

export default mongoose.model("User", userSchema);
