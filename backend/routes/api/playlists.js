const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const { User, Song, Playlist } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation.js");
const { requireAuth } = require("../../utils/auth.js");


// getting all playlists
router.get("/", asyncHandler(async (req, res) => {

}));

// getting one playlist
router.get("/:id(\\d+)", asyncHandler(async (req, res) => {

}));

router.post("/new-playlist", requireAuth, asyncHandler(async (req, res) => {

}));

router.delete("/:id(\\d+)", asyncHandler(async (req, res) => {

}));

module.exports = router;
