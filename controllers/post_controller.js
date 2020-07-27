var express = require("express");

var router = express.Router();

var message = require("../models/message.js");


router.get("/", (req, res) => {
    message.all((data) => {
        res.render("index", {
            post: data
        })
    })
})

router.post("/api/posts", (req, res) => {
    const name = req.body.name;
    const post = req.body.message;
    message.create(["name", "message"], [name, post], (data) => {
        console.log(data);
        res.json({
            id: data.insertedId
        })
    });
})

router.delete("/api/posts/:id", (req, res) => {
    const condition = `id = ${req.params.id}`;
    message.delete(condition, (data) => {
        if (data.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

router.put("/api/posts/:id", (req, res) => {
    const condition = `id = ${req.params.id}`;
    const updatedPost = req.body.message;
    message.update({
        message: updatedPost
    }, condition, (data) => {
        if (data.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})
module.exports = router;