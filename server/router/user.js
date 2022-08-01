const express = require("express");
const router = express.Router();
const con = require("../config/database");
const path = require("path");
const fs = require("fs");

router.get("/", (req, res) => {
    const {id} = req.query;

    if(id === "0"){
        res.send(req.user);
    }else{
        const sql = "select userid from users where userid = ?"
        con.query(sql, id, (err, results) => {
            let user = results[0];
            res.send(user);
        })
    }
})

router.get("/img", (req, res) => {
    let {id} = req.query;

    if(id === "0"){
        if(req.user){
            id = req.user.userid
        }else{
            const filePath = path.join(__dirname, "../../img/default.jpg");
            return res.sendFile(filePath)
        }
    }

    const sql = "select userprofile from users where userid = ?"
    
    con.query(sql, id, (err, result) => {
        const {userprofile} = result[0];
        const filePath = path.join(__dirname, "../../img/"+ userprofile + ".jpg");
        res.sendFile(filePath)
    })
})


router.put("/img", (req, res) => {
    const {userid} = req.user;
    const {file} = req.body;
    const base64Image = file.split(";base64,").pop();
    
    const sql = "update  users set userprofile = ? where userid = ?"
    fs.writeFile("./img/"+ userid +".jpg", base64Image, "base64", function(err) {
        if(!err){
            con.query(sql, [userid, userid], (err, result) => {
                res.send("0")
            })
        }
    });
})

module.exports = router;