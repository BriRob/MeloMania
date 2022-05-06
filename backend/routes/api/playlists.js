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
      // raw: true,
      // nested: true
    });

    // const playlist18 = await Playlist.findByPk(18, {
    //   include: { model: Song },
    //   raw: true,
    //   nested: true,
    // });

    // const songs = await Song.findAll({
    //   include: [{ model: Playlist, where: { playlistId: 18 }}],
    //   raw: true,
    //   nested: true,
    // });

    // console.log("\n\n", songs, "\n\n");
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

// route to get user playlists
router.get(
  "/user-playlists/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    // const userId = req.user.id;
    const { id } = req.params;
    const playlists = await Playlist.findAll({
      where: { userId: id },
      order: [["createdAt"]],
    });

    return res.json(playlists);
    // res.send("hello")
  })
);

// const relationValidation = [
//   check("")
// ]
// make new association between playlist and song
router.post(
  "/new-playlist-song-relation",
  asyncHandler(async (req, res) => {
    const { songId, playlistId } = req.body;
    // console.log("req.body", req.body)


    const newRelation = await SongsPlaylist.build({ songId, playlistId });

    // console.log("new relation", newRelation)
    // console.log("playlistId", playlistId)
    const prevRel = await SongsPlaylist?.findOne({where: {songId, playlistId}})
    // console.log("prevRel.playlistId", prevRel.playlistId)
    if (!prevRel) {
      await newRelation.save();
      return res.json(newRelation);
    } else {
      return res.json({
        message: "Song already exists on playlist. Please choose a different playlist"
      })
    }
  })
);

router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.id);
    const playlistId = playlist.id;

    const songsPlaylistRelation = await SongsPlaylist.findOne({
      where: { playlistId },
    });
    // console.log("songsPlaylistRelation", songsPlaylistRelation)
    if (songsPlaylistRelation)
      await SongsPlaylist.destroy({ where: { playlistId } });
    await Playlist.destroy({ where: { id: playlist.id } });

    return res.json({ playlistId });
  })
);

module.exports = router;
