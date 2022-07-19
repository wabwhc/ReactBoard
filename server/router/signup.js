const express = require("express");
const router = express.Router();
const con = require("../config/database");

router.post("/", (req, res) => {
    const {username, password} = req.body;
    const sql1 = "select userid from users where userid = ?";
    const sql2 = "insert into users (userid, password) values (?, ?)";
    con.query(sql1, username, (err, result) => {
        if(result.length !== 0){
            res.send("no");
        }else{
            con.query(sql2, [username, password], (err, result) => {
                res.send("hello");
            })
        }
        
    })
})


module.exports = router