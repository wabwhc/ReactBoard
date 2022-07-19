const express = require("express");
const router = express.Router();
const con = require("../config/database");



router.get("/user", (req, res) => {
    const {id} = req.query;
    const sql = "select post_id id, reply_content title from replys where userid = ?";
    con.query(sql, id, (err, result) => {
        res.send(result);
    })
})


router.get("/post", (req, res) => {
    const {id} = req.query;
    const sql = "select userid, reply_content from replys where post_id = ?";
    con.query(sql, id, (err, result) => {
        res.send(result);
    })
})

router.post("/post", (req, res) => {
    const {id} = req.query;
    const sql = "insert into replys (userid, reply_content, post_id) values(?, ?, ?)";

    let userid = "default";
    if(req.user !== undefined){
        userid = req.user.userid;
    }

    con.query(sql, [userid, req.body.content, id], (err, result) => {
        res.redirect("http://localhost:3000/post/" + id);
    })
})


module.exports = router;