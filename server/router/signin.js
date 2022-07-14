const express = require("express");
const passport = require("passport");
const local = require("./passport");
local();
const router = express.Router();
router.use(passport.initialize()); // passport 구동
router.use(passport.session()); // 세션 연결

router.post("/", passport.authenticate("local", {
    successRedirect : "/signin/success",
    failureRedirect : "/signin/fail"
}))

router.get("/success", (req, res) => res.send("hello"))
router.get("/fail", (req, res) => res.send("fail"))

module.exports = router;