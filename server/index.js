import bodyParser from "body-parser"; //eable to send post request
import express from "express"; //framwork for routing
import mongoose from "mongoose"; //To create models for posts
import cors from "cors";

import dotenv from "dotenv";

import postRoutes from "./routes/posts.js"; //import router
import userRoutes from "./routes/users.js"; //import router

const app = express(); //initialize  Express application object
dotenv.config();

//setting up Body parser to be able to properly send requests
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

//Using express middleware to connect router to application
app.use("/posts", postRoutes); // Every route in the router "postRoutes" will start with "post"
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING.");
});

const CONNECTION_URL =
  "mongodb+srv://tikpeme:tikpeme123@cluster0.ycy3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//Connect Server application to online MongoDB database ( Cload Atlas version)
const PORT = process.env.PORT || 4000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(4000, () => console.log(`server running on port: ${PORT}`))
  ) //If connection is successful then call our "App)"
  .catch((error) => console.log(error.message));

//mongoose.set("useFindAndModify", false);
