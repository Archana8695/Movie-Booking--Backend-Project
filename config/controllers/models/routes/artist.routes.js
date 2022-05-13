const router = require("express").Router();
const artistController = require("../controllers/artist.controller");

router.get("/artist", artistController.findAllArtists);

module.exports = router;