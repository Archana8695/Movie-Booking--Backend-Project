const router = require("express").Router();
const genreController = require("../controllers/genre.controller");
router.get("/genres", genreController.findAllGenres);
module.exports = router;