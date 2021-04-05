const router = require('express').Router();
const userRoutes = require("./api/user-routes");
const homeRoutes = require("./home-routes");
const postRoutes = require("./api/post-routes");
// const commentRoutes = require("./home-routes");
router.use('/', homeRoutes );
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
// router.use('/comments', commentRoutes);
module.exports = router;






