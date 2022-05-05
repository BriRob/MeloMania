const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const { User, Song, Playlist, SongsPlaylist } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation.js");
const { requireAuth } = require("../../utils/auth.js");

// getting all playlists
router.get(
  "/",
  asyncHandler(async (req, res) => {
    // res.send("hello")
    const playlists = await Playlist.findAll({
      // include: [User, Song],
      include: [User, { model: Song, include: User }],
      order: [["createdAt", "DESC"]],
    });
    return res.json(playlists);
  })
);

// getting one playlist
// router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
//     const playlistId = parseInt(req.params.id, 10);
//     const playlist = await Playlist.findByPk(playlistId, {
//         include: [User, {model: Song, include: User}]
//     })

//     return res.json(playlist);
// }));

const playlistFormValidation = [
  check("title")
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Title must be less than 100 characters")
    .custom((value) => !/^ *$/.test(value))
    .withMessage("Title must contain characters"),
  handleValidationErrors,
];

router.post(
  "/new-playlist",
  requireAuth,
  playlistFormValidation,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { title } = req.body;
    const newPlaylist = await Playlist.create({ userId, title });

    // making this returning playlist so that updated playlists state has the same eagerloading keys the other playlists in main state
    const returningPlaylist = await Playlist.findByPk(newPlaylist.id, {
      include: [User, { model: Song, include: User }],
    });
    return res.json(returningPlaylist);
  })
);

router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {})
);

module.exports = router;
