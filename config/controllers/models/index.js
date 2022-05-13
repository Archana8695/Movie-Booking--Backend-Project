const mongoose = require("mongoose");

const db = {
  mongoose: mongoose,
  url: require("../config/db.config").url,
  artist: require("./artist.model")(mongoose),
  genre: require("./genre.model")(mongoose),
  movie: require("./movie.model")(mongoose),
  user: require("./user.model")(mongoose),
};
module.exports = db;