const artist = require("../models").artist;
exports.findAllArtists = (req, res) => {
  artist
    .find({})
    .then((data) => res.send(data))
    .catch((e) => res.send({ message: "Couldnt find the movies" + e }));
};