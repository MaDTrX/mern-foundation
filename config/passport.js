const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const passport = require("passport");
const User = require('../models/user.js')
const { v4: passkey } = require('uuid')

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
        },
        function (accessToken, refreshToken, profile, cb) {
            console.log('hi')
            console.log(profile)
            User.findOne({ authId: profile.id }).then(async function (user) {

                if (user) return cb(null, user);
                // We have a new user via OAuth!
                try {
                    user = await User.create({
                        name: profile.displayName,
                        authId: profile.id,
                        avatar: profile.photos[0].value,
                        email: profile.emails[0].value,
                        password: passkey().substring(0, 8)

                    });
                    return cb(null, user);
                } catch (err) {
                    return cb(err);
                }
            });
        }

    )
);

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback",
        },
        function (accessToken, refreshToken, profile, cb) {
            // console.log(profile)
            User.findOne({ authId: profile.id }).then(async function (user) {

                if (user) return cb(null, user);
                // We have a new user via OAuth!
                try {
                    user = await User.create({
                        name: profile.displayName,
                        authId: profile.id,
                        avatar: profile.photos[0].value,
                        email: profile.emails[0].value,
                        password: passkey().substring(0, 8)
                    });
                    return cb(null, user);
                } catch (err) {
                    return cb(err);
                }
            });
        }
    )
);

passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: "/auth/twitter/callback",
        },
        function (accessToken, refreshToken, profile, cb) {
            User.findOne({ authId: profile.id }).then(async function (user) {

                if (user) return cb(null, user);
                // We have a new user via OAuth!
                try {
                    user = await User.create({
                        name: profile.displayName,
                        authId: profile.id,
                        avatar: profile.photos[0].value,
                        password: passkey().substring(0, 8)
                    });
                    return cb(null, user);
                } catch (err) {
                    return cb(err);
                }
            });
            cb(null, profile);
        }
    )
);
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: "/auth/facebook/callback",
        },
        function (accessToken, refreshToken, profile, cb) {
            User.findOne({ authId: profile.id }).then(async function (user) {

                if (user) return cb(null, user);
                // We have a new user via OAuth!
                try {
                    user = await User.create({
                        name: profile.displayName,
                        authId: profile.id,
                        avatar: profile.photos[0].value,
                        email: profile.emails[0].value,
                        password: passkey().substring(0, 8)
                    });
                    return cb(null, user);
                } catch (err) {
                    return cb(err);
                }
            });
            console.log(profile)
            cb(null, profile);
        }
    )
);

passport.serializeUser((user, cb) => {
    cb(null, user._id);
});

passport.deserializeUser((userId, cb) => {
    User.findById(userId).then(function (user) {
        cb(null, user);
    });
});
