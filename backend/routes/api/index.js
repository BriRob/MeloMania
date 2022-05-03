const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

const { User, Song } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation.js");
const {requireAuth } = require("../../utils/auth.js")

router.use('/session', sessionRouter);
router.use('/users', usersRouter);


// getting all songs
router.get("/", asyncHandler(async(req, res) => {
    const songs = await Song.findAll({
        include: [
            {model: User}
        ],
        order: [['createdAt', 'DESC']]
    })
    // console.log("songs", songs)
    // console.log("username", songs[0].User.username)
    // console.log("hello")
    return res.json(songs)
}))

// getting one song
router.get("/songs/:id(\\d+)", asyncHandler(async(req, res) => {
    const songId = parseInt(req.params.id, 10)
    const song = await Song.findByPk(songId, {
        include: { model: User}
    })

    return res.json(song)
}))


const songFormValidation = [ //^(\w).*\.wav|.mp3$
    check('title')
        .notEmpty()
        .withMessage('Title cannot be empty')
        .isLength({ max: 100 })
        .withMessage('Title must be less than 100 characters')
        .custom((value) => !/^ *$/.test(value))
        .withMessage("Title must contain characters"),
    check('url')
        .notEmpty()
        .withMessage('URL cannot be empty')
        .custom((value) => /(\.wav$|\.mp3$)/.test(value))
        .withMessage('Url end in .mp3 or .wav')
        .isURL()
        .withMessage('Must be valid url'),
    handleValidationErrors
];

router.post("/new-song", requireAuth, songFormValidation, asyncHandler(async(req, res) => {
    // console.log("REQ USER ID", req.user.id)
    // console.log("REQ BODY", req.body)
    const userId = req.user.id
    const { title, url, description } = req.body
    const newSong = await Song.create({
        userId, title, url, description
    });
    console.log("NEW SONG", newSong)
    console.log("BASEURL", req.baseUrl)
    return res.redirect(`${req.baseUrl}/songs/${newSong.id}`)

}))

router.put("/songs/:id", asyncHandler(async(req, res) => {

}))


router.delete("/new-song", asyncHandler(async(req, res) => {

}))

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
