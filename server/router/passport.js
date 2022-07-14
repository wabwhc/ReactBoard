const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const con = require("../config/database");


module.exports = () => {
    passport.serializeUser((user, done) => {
        return done(null, {userid : user.userid});
    });

    passport.deserializeUser((userid, done) => {
        return done(null, userid);
    });

    passport.use(new LocalStrategy({
            session: true,
        },
        async (username, password, done) => {
            
            const sql = "select userid, password from users where userid = ?";
            con.query(sql, [username], (err, result, field) => {
                if(result[0] === undefined){
                    return done(null, false)
                }else if(result[0].password === password){
                    return done(null, result[0])
                }else{
                    return done(null, false)
                }
            })
        }
    ));
}