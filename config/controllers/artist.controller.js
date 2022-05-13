const artist = require("../models").artist;
exports.findAllArtists = (req, res) => {
  artist
    .find({})
    .then((data) => res.json({ data: data }))
    .catch((e) => res.send({ message: "Couldnt find the movies" + e }));
};