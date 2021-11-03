const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/all/color", (req, res) => {
    db.Color.findAll({
    }).then(dbColor => {
        res.json(dbColor);
    });
});

router.get("/all/color/user", (req, res) => {
    db.Color.findAll({
        where: {
            UserId: req.body.id
        }
    }).then(dbColor => {
        res.json(dbColor);
    });
});

router.put("/api/color/update", (req, res) => {
    db.Color.update({ UserId: 2 }, {
        where: {
            id: req.body.id
        }
    })
        .then(() => res.send({ msg: "successfully added" }))
        .catch((err) => res.send(err));
});

module.exports = router;

// router.post("/api/color", (req, res) => {
//     db.Color.create({
//         UserId: 1,
//         name: "Philip",
//         rgb: "Kouchner",
//         hex: "color",
//     })
//         .then(() => res.send({ msg: "successfully added" }))
//         .catch((err) => res.send(err));
// });
