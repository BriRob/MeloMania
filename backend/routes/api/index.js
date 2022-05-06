const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const playlistsRouter = require("./playlists.js");
const commentsRouter = require("./comments.js")

const { User, Song, SongsPlaylist, Playlist, Comment } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation.js");
const { requireAuth } = require("../../utils/auth.js");
const {
  singleMulterUpload,
  singlePublicFileUpload,
} = require("../../awsS3.js");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/playlists", playlistsRouter);
router.use("/comments", commentsRouter);

// getting all songs
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const songs = await Song.findAll({
      include: [{ model: User }],
      order: [["createdAt", "DESC"]],
    });
    // console.log("songs", songs)
    // console.log("username", songs[0].User.username)
    // console.log("hello")
    return res.json(songs);
  })
);

// getting one song
router.get(
  "/songs/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const songId = parseInt(req.params.id, 10);
    const song = await Song.findByPk(songId, {
      include: [Comment, { model: User }],
    });

    // console.log()
    return res.json(song);
  })
);

const songFormValidation = [
  //^(\w).*\.wav|.mp3$
  check("title")
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

router.post(
  "/new-song",
  singleMulterUpload("url"), // was "image"
  requireAuth,
  songFormValidation,
  asyncHandler(async (req, res, next) => {
    // console.log("REQ USER ID", req.user.id)
    // console.log("REQ BODY", req.body)
    const userId = req.user.id;
    // console.log(req)
    const { title, url, description } = req.body;
    // console.log("url \n\n", url);

    if (req.file) {
      const songUrl = await singlePublicFileUpload(req.file); // was profileImageUrl

      if (songUrl.indexOf(".mp3") == songUrl.length - 4) {
        // console.log("hello ")
        const newSong = await Song.create({
          userId,
          title,
          url: songUrl,
          description,
        });
        // console.log("NEW SONG", newSong)
        // console.log("BASEURL", req.baseUrl)
        return res.redirect(`${req.baseUrl}/songs/${newSong.id}`);
      } else {
        const err = new Error("file must be .mp3")
        next(err)
      }
    } else {
      const noFileErr = new Error("Cannot submit post without file")
      next(noFileErr)
    }

    // console.log("req file \n\n", req.file);
    // console.log("songUrl \n\n", songUrl);

    // console.log("songURL index of \n\n", songUrl.indexOf(".mp3") == songUrl.length - 4)

  })
);

router.put(
  "/songs/:id(\\d+)",
  requireAuth,
  songFormValidation,
  asyncHandler(async (req, res) => {
    // const userId = req.user.id
    // console.log("REQ BODY ID", req.body.id);
    const songId = req.body.id;
    delete req.body.id;
    // const songId = parseInt(req.params.id, 10)
    await Song.update(req.body, {
      where: { id: songId },
      returning: true,
      plain: true,
    });

    const updatedSong = await Song.findByPk(songId, {
      include: { model: User },
    });
    // console.log("UPDATED SONG", updatedSong);
    return res.json(updatedSong);
  })
);

router.delete(
  "/songs/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const song = await Song.findByPk(req.params.id);
    const songId = song.id;

    const songsPlaylistRelation = await SongsPlaylist.findOne({
      where: { songId },
    });
    // console.log("songsPlaylistRelation", songsPlaylistRelation)
    if (songsPlaylistRelation)
      await SongsPlaylist.destroy({ where: { songId } });

    // console.log("SONG ID", songId)
    await Song.destroy({ where: { id: song.id } });
    // res.redirect(`/`)
    return res.json({ songId });
  })
);

module.exports = router;

// test api route with backend set up and partially for frontend set up to test csrfFetch
// router.post("/test", function (req, res) {
//   res.json({ requestBody: req.body });
// });

// API TESTING WITH AUTH MIDDLEWARE

// const asyncHandler = require('express-async-handler');
// const { setTokenCookie } = require('../../utils/auth.js');
// const { restoreUser } = require('../../utils/auth.js');
// const { User } = require('../../db/models');

// // test the setTokenCookie function by getting the demo user and calling setTokenCookie
// // GET /api/set-token-cookie
// router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

// // test the restoreUser middleware by connecting the middleware and checking whether or not the req.user key has been populated by the middleware properly
// // GET /api/restore-user
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // testing requireAuth middleware / if no session user, return error / otherwise, return session user's info
// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );
