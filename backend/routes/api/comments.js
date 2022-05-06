const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation.js");
const { requireAuth } = require("../../utils/auth.js");

const { User, Song, Playlist, SongsPlaylist, Comment } = require("../../db/models");

const commentFormValidation = [];
// post
router.post(
  "/new-comment",
  requireAuth,
  commentFormValidation,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { comment, songId } = req.body;
    const newComment = await Comment.create({ userId, comment, songId });

    // return comment to add to comment state
    const returningComment = await Comment.findByPk(newComment.id);
    return res.json(returningComment);
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
