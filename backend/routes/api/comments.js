const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation.js");
const { requireAuth } = require("../../utils/auth.js");

const {
  User,
  Song,
  Playlist,
  SongsPlaylist,
  Comment,
} = require("../../db/models");

const commentFormValidation = [
  //^(\w).*\.wav|.mp3$
  check("comment")
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Title must be less than 100 characters")
    .custom((value) => !/^ *$/.test(value))
    .withMessage("Title must contain characters"),
  // check("songUrl")
  //   .notEmpty()
  //   .withMessage("Cannot submit post without file"),
  // check("url")
  //   .notEmpty()
  //   .withMessage("URL cannot be empty")
  //   .custom((value) => /(\.wav$|\.mp3$)/.test(value))
  //   .withMessage("Url end in .mp3 or .wav")
  //   .isURL()
  //   .withMessage("Must be valid url"),
  handleValidationErrors,
];
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
