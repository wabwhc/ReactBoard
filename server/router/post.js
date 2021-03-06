const express = require("express");
const router = express.Router();
const con = require("../config/database");


router.get("/", (req, res) => {
    const {id} = req.query;
    
    const sql = "select * from posts where post_id = ?";
    con.query(sql, id, (err, result) => {
        const post = result[0];
        res.send(post);
    })
})

router.post("/", (req, res) => {
    const sql = "insert into posts (userid, post_title, post_content) values (?, ?, ?) ";
    const {title} = req.body;
    const content = req.body.content.replace(/\n/gi, "<br>");
    let userid = "default";

    if(req.user !== undefined){
        userid = req.user.userid;
    }

    con.query(sql, [userid, title, content], (err, result) => {
        res.redirect("http://localhost:3000");
    })
})

router.delete("/", (req, res) => {
    const {id} = req.query;
    
    const sql = "delete from posts where post_id = ?";
    con.query(sql, id, (err, result) => {
        if(!err) res.send("0");
    })
})

router.put("/", (req, res) => {
    const {data} = req.body;

    const {title, post_id} = data;
    const content = data.content.replace(/\n/gi, "<br>");
    const sql = "update posts set post_title = ?, post_content = ? where post_id = ?"
    con.query(sql, [title, content, post_id], (err, result) => {
        if(!err) return res.send('0');
    })
})

router.get("/user", (req, res) => {
    const {id} = req.query;
    const sql = "select post_id id, post_title title from posts where userid = ?";
    con.query(sql, id, (err, result) => {
        res.send(result);
    })
})

//router.get("/reply/user", (req, res) => {
//    const {id} = req.query;
//    const sql = "select post_id id, reply_content title from replys where userid = ?";
//    con.query(sql, id, (err, result) => {
//        return res.send(result);
//    })
//})
//
//router.get("/reply/post", (req, res) => {
//    const {id} = req.query;
//    const sql = "select userid, reply_content from replys where post_id = ?";
//    con.query(sql, id, (err, result) => {
//        return res.send(result);
//    })
//})
//
//router.post("/reply/post", (req, res) => {
//    const {id} = req.query;
//    const sql = "insert into replys (userid, reply_content, post_id) values(?, ?, ?)";
//
//    let userid = "default";
//    if(req.user !== undefined){
//        userid = req.user.userid;
//    }
//
//    con.query(sql, [userid, req.body.content, id], (err, result) => {
//        res.redirect("http://localhost:3000/post/" + id);
//    })
//})
//
router.get("/page", (req, res) => {

    const {id} = req.query;
    const result = {
        postsCount : 0,
        posts : []
    };

    const sql1 = "select count(post_id) count from posts";
    //const sql2 = `select post_id, post_title, userid, post_at from posts order by post_at orders limit 10 offset ${id * 10}`;
    const sql2 = `select post_id, post_title, userid, post_at from posts order by post_at desc, post_id desc limit ${id * 10}, 10`;

    con.query(sql1, (err, result1) => {
        result.postsCount = result1[0];
        con.query(sql2, (err, result2) => {
            result.posts = result2;
            res.send(result);
        })
    })
})



module.exports = router;