import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import sendEmail from "./email.send.js";
import templates from "./email.templates.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await userModel.findOne({ email });

    if (!oldUser) {
      return res.status(404).json({ message: "User Not Found, Please Signup" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1hr",
    });
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const collectEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await userModel.findOne({ email });
    //check if the oldUser is the valid user in the db, if not
    if (!oldUser) {
      const user = await userModel.create({ email });
      sendEmail(user.email, templates.confirm(user._id)).then(() =>
        res.status(200).json({
          user,
          message: "Email sent, please check your inbox to confirm",
        })
      );
    } else if (oldUser && !oldUser.email_verified) {
      // this case is: oldUser is valid user in db but email is not verified
      const user = await userModel.findOne({ email });
      sendEmail(user.email, templates.confirm(user._id)).then(() => {
        if (user.name && user.password) {
          res.status(200).json({
            user,
            message: "Confirmation email resent, maybe check your spam?",
            nameFlag: true,
          });
        } else {
          res.status(200).json({
            user,
            message: "Confirmation email resent, maybe check your spam? false",
            nameFlag: false,
          });
        }
      });
    } else {
      // this case is: oldUser is valid user in db also the email is verified
      const user = await userModel.findOne({ email });
      if (user.password) {
        res.status(200).json({
          user,
          message: "Your Data is already updated, kindly login",
          flag: true,
        });
      } else {
        res.status(200).json({
          user,
          message: "Your email was already confirmed, Enter the User data now.",
          flag: false,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const confirmEmail = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findOne({ _id: id });

    if (!user) {
      res.status(200).json({ message: "Could not find the user with this Id" });
    } else if (user && !user.email_verified) {
      userModel
        .findByIdAndUpdate(id, { email_verified: true })
        .then(() =>
          res.status(200).json({ message: "Your email is confirmed!" })
        );
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await userModel.findOne({ email });

    if (oldUser) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await userModel.findByIdAndUpdate(oldUser._id, {
        password: hashedPassword,
        name: firstName + " " + lastName,
      });

      const token = jwt.sign({ email: result.email, id: result._id }, secret, {
        expiresIn: "1hr",
      });
      console.log(result);
      res.status(200).json({ result, token });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const googleSignin = async (req, res) => {
  const { email, name, token, googleId } = req.body;

  try {
    const oldUser = await userModel.findOne({ email });

    if (oldUser) {
      const result = { _id: oldUser._id.toString(), email, name };
      return res.status(200).json({ result, token });
    } else {
      return res.status(404).json({ message: "User Not Found, Please Signup" });
    }

    /*const result = await userModel.create({
      email,
      name,
      googleId,
    });
    res.status(200).json({ result, token }); */
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const googleSignup = async (req, res) => {
  const { email, name, token, googleId, email_verified } = req.body;

  try {
    const oldUser = await userModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const result = await userModel.create({
      email,
      name,
      googleId,
      email_verified,
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
