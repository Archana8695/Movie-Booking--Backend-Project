const movie = require("../models").movie;

exports.findAllMovies = (req, res) => {
  const { status, title, genres, artists, start_date, end_date } = req.query;
  // if (
  //   status !== undefined &&
  //   title !== undefined &&
  //   genres !== undefined &&
  //   artists !== undefined &&
  //   start_date !== undefined &&
  //   end_date !== undefined
  // ) {
  //   movie.findOne({ title: title });
  // }
  if (status === undefined) {
    movie
      .find({})
      .then((data) => {
        res.json({ data: data });
      })
      .catch((e) => res.send({ message: "Couldnt find the movies" + e }));
  } else if (status === "PUBLISHED") {
    movie
      .find({ published: true })
      .then((data) => res.send({ data: data }))
      .catch((e) => res.send({ message: "Couldnt find the movies" + e }));
  } else if (status === "RELEASED") {
    movie
      .find({ released: true })
      .then((data) => res.send({ data: data }))
      .catch((e) => res.send({ message: "Couldnt find the movies" + e }));
  } else {
    res.status(400).send({ message: "invalid query string" });
  }
};

exports.findOne = (req, res) => {
  const { movieId } = req.params;

  movie
    .findOne({ movieid: movieId })
    .then((data) => {
      if (data === null) {
        res.send({ message: "Movie ID out of bound" });
      } else {
        res.json({ data: data });
      }
    })
    .catch((e) => res.send({ message: "Couldnt find the movies" + e }));
};

exports.findShows = (req, res) => {
  const { movieId } = req.url.params;
  movie
    .findOne({ movieid: movieId })
    .select("shows")
    .then((data) => {
      if (data === null) {
        res.send({ message: "Movie ID out of bound" });
      } else {
        res.json({ data: data });
      }
    })
    .catch((e) => res.send({ message: "Couldnt find the movies" + e }));
};