const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const { User, Song, Playlist, SongsPlaylist } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation.js");
const { requireAuth } = require("../../utils/auth.js");


// getting all playlists
router.get("/", asyncHandler(async (req, res) => {
    // res.send("hello")
    const playlists = await Playlist.findAll({
        // include: [User, Song],
        include: [User, {model: Song, include: User}],
        order: [["createdAt", "DESC"]]
    })
    return res.json(playlists)
}));

// getting one playlist
// router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
//     const playlistId = parseInt(req.params.id, 10);
//     const playlist = await Playlist.findByPk(playlistId, {
//         include: [User, {model: Song, include: User}]
//     })

//     return res.json(playlist);
// }));

router.post("/new-playlist", requireAuth, asyncHandler(async (req, res) => {

}));

router.delete("/:id(\\d+)", asyncHandler(async (req, res) => {

}));

module.exports = router;
