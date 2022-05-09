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
    .withMessage("Comment cannot be empty")
    // .isLength({ max: 100 })
    // .withMessage("comment must be less than 100 characters")
    .custom((value) => !/^ *$/.test(value))
    .withMessage("Comment must contain characters"),
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
    const returningComment = await Comment.findByPk(newComment.id, {include: {model: User}});
    // console.log("returning comment\n\n", returningComment)
    return res.json(returningComment);
  })
);

router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    // console.log("in delete API \n\n")

    const comment = await Comment.findByPk(req.params.id);
    const commentId = comment.id;

    await Comment.destroy({ where: { id: comment.id } });
    // console.log("returning commentId\n\n", commentId)

    return res.json({ commentId });
    console.log("just trying to get this back on to main")
  })
);

module.exports = router;
