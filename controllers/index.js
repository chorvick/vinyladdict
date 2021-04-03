const router = require('express').Router();
const userRoutes = require("./api/user-routes");
// const commentRoutes = require("./comment-routes");
const postRoutes = require("./api/post-routes");
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
// router.use('/comments', commentRoutes);
module.exports = router;






