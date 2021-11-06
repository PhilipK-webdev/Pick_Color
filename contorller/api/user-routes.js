const express = require("express");
const router = express.Router();
const db = require("../../models");
// const app = express();
// const PORT = process.env.PORT || 5000;
router.get("/all", (req, res) => {
    db.User.findAll({
        // include: [db.Post]
    }).then(dbAuthor => {
        res.json(dbAuthor);
    });
});

router.post("/create", (req, res) => {
    db.User.create({
        name: req.body.name,
        color: req.body.color
    }).then(() => {
        res.send({ msg: "successfully added" });
    });
});
router.patch("/api/user/update", (req, res) => {
    db.User.update({ color: req.body.color }, {
        where: {
            id: req.body.id
        }
    })
        .then(() => res.send({ msg: "successfully added" }))
        .catch((err) => res.send(err));
});
// app.get('/', function (res, req) {
//     db.sequelize.authenticate().then(() => {
//         app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
//     })
//         .catch(err => {
//             console.error('Unable to connect to the database:', err);
//             res.send('Unable to connect to the database.');
//         });
// });
module.exports = router;