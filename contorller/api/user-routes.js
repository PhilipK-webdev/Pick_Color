const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/all", (req, res) => {
    db.User.findAll({
        // include: [db.Post]
    }).then(dbAuthor => {
        res.json(dbAuthor);
    });
});

router.post("/create", (req, res) => {
    db.User.create({
        name: req.body.name
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;