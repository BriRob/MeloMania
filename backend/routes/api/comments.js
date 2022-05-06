const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation.js");
const { requireAuth } = require("../../utils/auth.js");

const commentFormValidation = [];
// post
router.post(
  "/new-comment",
  requireAuth,
  commentFormValidation,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    // const { title } = req.body;
    // const newPlaylist = await Playlist.create({ userId, title });

    // making this returning playlist so that updated playlists state has the same eagerloading keys the other playlists in main state
    // const returningPlaylist = await Playlist.findByPk(newPlaylist.id, {
    //   include: [User, { model: Song, include: User }],
    // });
    // return res.json(returningPlaylist);
  })
);

router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    // const playlist = await Playlist.findByPk(req.params.id);
    // const playlistId = playlist.id;

    // const songsPlaylistRelation = await SongsPlaylist.findOne({
    //   where: { playlistId },
    // });
    // // console.log("songsPlaylistRelation", songsPlaylistRelation)
    // if (songsPlaylistRelation)
    //   await SongsPlaylist.destroy({ where: { playlistId } });
    // await Playlist.destroy({ where: { id: playlist.id } });

    // return res.json({ playlistId });
  })
);

module.exports = router;
