const express = require("express");
const router = express.Router();
const con = require("../config/database");


router.get("/", (req, res) => {
    const {id} = req.query;
    
    const sql = `select * from posts where post_id = ?`
    con.query(sql, id, (err, result) => {
        const post = result[0];
        return res.send(post);
    })
})

router.post("/", (req, res) => {
    res.send("hello");
})

router.put("/", (req, res) => {
    res.send("hello");
})

router.get("/write", (req, res) => {
    const {id} = req.query;
    const sql = "select post_id id, post_title title from posts where userid = ?";
    con.query(sql, id, (err, result) => {
        return res.send(result);
    })
})

router.get("/reply", (req, res) => {
    const {id} = req.query;
    const sql = "select post_id id, reply_content title from replys where userid = ?";
    con.query(sql, id, (err, result) => {
        return res.send(result);
    })
})

router.get("/page", (req, res) => {

    const {id} = req.query;
    const result = {
        postsCount : 0,
        posts : []
    };

    const sql1 = "select count(post_id) count from posts";
    const sql2 = `select post_id, post_title, userid, post_at from posts orders limit 10 offset ${id * 10}`;

    con.query(sql1, (err, result1) => {
        result.postsCount = result1[0];
        con.query(sql2, (err, result2) => {
            result.posts = result2;
            return res.send(result);
        })
    })
})



module.exports = router;