/// lots too add here

const router = require("express").Router();
const { User, Post } = require("../../models");

// get users

router.get("/", (req, res) => {
    User.findAll({
        attributes: { exclude: ["password"] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);

        });
});

//// log out 
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
});





router.put("/:id", (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }

    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user available with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);

        });
});


/// delete

router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }

    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user w/ this id is available, sorry " });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(error);
            res.status(500).json(err);
        });
});

// getting user with id 

router.get("/:id", (req, res) => {
    User.findOne({
        attributes: { exclude: ["password"] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ["id", "title", "description", "created_at"],
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "created_at"],
                include: {
                    model: Post,
                    attributes: ["title"]
                }
            },


        ]

    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "Sorry no user has this id number" });
                return;

            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username - dbUserData.username;
                req.session.loggedIn = true;
                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);

        });

});



module.exports = router;


















module.exports = router;