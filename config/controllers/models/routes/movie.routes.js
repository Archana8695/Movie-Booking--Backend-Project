const router = require("express").Router();
const movieController = require("../controllers/movie.controller");

router.get("/movies", movieController.findAllMovies);

router.get("/movies/:movieId", movieController.findOne);

module.exports = router;