const express = require("express");
const artistRoutes = express.Router();
const artistController = require("../controllers/artist.controller");

artistRoutes.get("/", artistController.findAllArtists);

module.exports = artistRoutes;