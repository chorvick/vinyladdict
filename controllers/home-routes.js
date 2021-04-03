/// lots to add in here



const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');
/// home route

router.get("/", withAuth, (req, res) => {
    // Post.findAll({
    //     attributes: ["id", "title", "content", "created_at"],


    //     model: User,
    //     attributes: ['username'],
    // }
    //     // ]
    // )
    //     .then(dbPostData => {
    //         const posts = dbPostData.map(post => post.get({ plain: true }));

    //         res.render("homepage", { posts, loggedIn: req.session.loggedIn });

    //     })

    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json(err);
    //     });

    res.render("homepage");
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
        attributes: ["id", "content", "title", "created_at"],
        include: [{



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





module.exports = router;