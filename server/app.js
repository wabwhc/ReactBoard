const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const env = require("dotenv");
env.config();
const passport = require("passport");
const path = require("path");
const con = require("./config/database");
//Router
const signin = require("./router/signin");
const user = require("./router/user");
const post = require("./router/post");
const signup = require("./router/signup");
const reply = require("./router/reply");

app.use("/img", express.static(path.join(__dirname, "../img")));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: false}));
app.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // allow session cookie from browser to pass through
   })
);

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure:false
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/signin", signin);
app.use("/user", user);
app.use("/post", post);
app.use("/signup", signup);
app.use("/reply", reply);

app.get("/subject", (req, res) => {
    const sql = "select * from subjects";
    con.query(sql, (err, result) => {
        res.send(result);
    })
})

app.get("/logout", (req, res) => {
    req.session.destroy()
    res.clearCookie(this.cookie, { path: "/" });
    res.send("logout");
})


app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(8080, () => {
    console.log("con 8080Port")
});