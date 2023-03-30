import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import dotenv from "dotenv";

//mongodb+srv://shree:<password>@cluster0.3ke9o.mongodb.net/?retryWrites=true&w=majority

//mongodb+srv://shreeparab:<password>@cluster0.vztmj.mongodb.net/?retryWrites=true&w=majority

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
//app.use(cors());

app.use("/users", userRouter); // http://localhost:5000/users/signup
app.use("/tour", tourRouter);
app.get("/", (req, res) => {
  res.send("Wecome to tour API");
});

const MONGODB_URL =
  "mongodb+srv://shreeparab:R19btV2ZWswVjJ2p@cluster0.vztmj.mongodb.net/tour_db?retryWrites=true&w=majority&ssl=true";
const port = process.env.PORT || 5000;
//app.get("/", (req, res) => {
//  res.send("Hello world");
//});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("Server Running on port: " + port);
    });
  })
  .catch((error) => console.log(error));
