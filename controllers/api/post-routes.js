// lots to add here 

const router = require("express").Router();
const { Post, User } = require("../../models");
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");
// get posts

router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "title", "description", "created_at"],
        order: [
            ["created_at", "DESC"]
        ],

        include: [{
            model: User,
            attributes: ['username'],
        },
        {
            model: Comment,
            attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
            include: {
                model: User,
                attributes: ['username'],
            }

        },
        ]
    })
        .then(dbPostData => res.json(dbPostData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);

        }
        )
});

// make a new post

router.post("/", withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user_id,



    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});


/// check user posts

router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id

        },
        attributes: ["id", "discription", "title", "created_at"],
        include: [{
            model: User,
            attributes: ["username"],
        },
        {
            model: Comment,
            attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
            include: {
                model: User,
                attributes: ["username"],
            }


        }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: "Sorry there is no post for that id" });
                return;

            }
            res.json(dbPostData);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

// deleting a post............

router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }

    }).than(dbPostData => {
        if (!dbPostData) {

            res.status(404).json({ message: "No post was found with this id, Sorry" });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.json(500).json(err);

    });
});


module.exports = router;


















module.exports = router;