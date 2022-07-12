const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Song } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

router.get("/:userId(\\d+)", asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  console.log(userId)

  // // const song = await Song.findByPk(songId, {
  // //   include: [{ model: Comment, include: User }, { model: User }],
  // // });
  const user = await User.findByPk(userId, {
    // include: Song
  })

  const songs = await Song.findAll({
    where: {
      userId
    },
    order: [['createdAt', 'DESC']]
  })

  console.log("here are one user's songs \n\n", songs)

  return res.json({user, songs})

  // const song = await Song.findByPk(songId, {
  //   include: [
  //     // { model: Comment, include: User, order: [["createdAt", "DESC"]] },
  //     { model: User },
  //   ],
  // });

  // // console.log()
  // return res.json(song);
}))

module.exports = router;
