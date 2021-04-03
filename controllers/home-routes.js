/// lots to add in here


const sequelize = require("../config/connection");
const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');
/// home route

router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "title", "description", "created_at"],
        include: [{
            model: Comment,
            attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
            include: {
                model: User,
                attributes: ['username'],
            }
        },
        {
            model: User,
            attributes: ['username'],
        }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));

            res.render("homepage", { posts, loggedIn: req.session.loggedIn });
        })

        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });


});


//// user allready signed up log in

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;

    }
    res.render("login");
});

/// when user needs to sign up

router.get("/signup", (req, res) => {
    res.render("signup");

});



router.get("/post.:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id", "description", "title", "created_at"],
        include: [{
            model: Comment,
            attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
            include: {
                model: User,
                attributes: ['username'],
            }
        },

        {
            model: User,
            attributes: ['username'],

        },
        ]
    })
        ////// if no post w/ that id 404 says sorry no post available
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: "Sorry no post found with this id" });
                return;
            }
            const post = dbPostData.get({ plain: true });

            res.render("single-post", {
                post,
                loggedIn: req.session.loggedIn

            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//// commenting section


router.get('/posts-comments', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },

        attributes: ['id', 'description', 'title', 'created_at'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }

        },
        {
            model: User,
            attributes: ['username']

        }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: "Sorry but there is no post matching this id" });
                return;
            }
            const post = dbPostData.get({ plain: true });
            res.render('posts-comments', { post, loggedIn: req.session.loggedIn });



        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
























module.exports = router;