const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

const { User, Song } = require("../../db/models")


router.use('/session', sessionRouter);
router.use('/users', usersRouter);

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

router.get("/songs/:id", asyncHandler(async(req, res) => {

}))

router.put("/songs/:id", asyncHandler(async(req, res) => {

}))

router.post("/new-song", asyncHandler(async(req, res) => {

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
