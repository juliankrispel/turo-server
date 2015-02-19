var conf = require('../.config.json');
var passport = require('passport');
var twitterStrategy = require('passport-twitter').Strategy;

passport.use(
    new TwitterStrategy({
        consumerKey: conf.TWITTER_CONSUMER_KEY,
        consumerSecret: conf.TWITTER_CONSUMER_SECRET,
        callbackURL: "/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
        console.log('token', token);
        console.log('tokenSecret', tokenSecret);
        console.log('profile', profile);
        console.log('done', done);
        //User.findOrCreate(..., function(err, user) {
        //    if (err) { return done(err); }
        //    done(null, user);
        //});
    }
));

module.exports = {
    twitter: function(config){
        return passport.authenticate('twitter', config);
    }
}

