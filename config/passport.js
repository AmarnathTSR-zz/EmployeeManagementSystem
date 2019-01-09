const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/Users');

const key = require('../config/keys');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        console.log(jwt_payload);

        User.findById(jwt_payload.id).then(user => {
            if (user) {
                return done(null, user);

            }
            return done(null, false)
                .catch(err => {
                    console.log(err)
                })
        })



    }));

};