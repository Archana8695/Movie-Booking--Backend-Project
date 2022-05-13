const express = require("express");
const PORT = 3000;
const db = require("./models");
const cors = require("cors");
const app = express();
const movieRouter = require("./routes/movie.routes");
const genreRouter = require("./routes/genre.routes");
const artistRouter = require("./routes/artist.routes");
const userRouter = require("./routes/user.routes");
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
const corsOptions = {
  origin: "http://localhost:3001",
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Upgrad Movie booking application development.",
});
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
  app.use("/api", movieRouter, genreRouter, artistRouter);
  app.use("/api/auth", userRouter);
  app.listen(PORT, () => {
    console.log("listening to port number " + PORT);
  });