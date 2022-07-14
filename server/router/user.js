const express = require("express");
const router = express.Router();
const con = require("../config/database");
const path = require("path");
const fs = require("fs");

router.get("/", (req, res) => {
    const {id} = req.query;

    if(id === "0"){
        return res.send(req.user);
    }else{
        const sql = "select userid from users where userid = ?"
        con.query(sql, id, (err, results) => {
            let user = results[0];
            return res.send(user);
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
        return res.sendFile(filePath)
    })
})


router.put("/img", (req, res) => {

    let {file} = req.body;

    let base64Image = file.split(";base64,").pop();
    console.log(base64Image.length);
    let sql = "update  users set userprofile = ? where userid = ?"
    fs.writeFile("./img/"+ "test1" +".jpg", base64Image, "base64", function(err) {
        console.log(err);
        res.send("ok")
    });
})

module.exports = router;