const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routes/auth");
const postRouter = require("./Routes/post");
const cors = require("cors");
const app = express();

//middleware----------------------------------------------
app.use(cors());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/posts", postRouter);
app.listen(5000, () => {
  console.log("server is running on port 5000");
  mongoose
    .connect("mongodb://localhost:27017/Thinkwik")
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));
});
