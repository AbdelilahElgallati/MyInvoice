const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Enterprise = require("../Models/EntrepriseSchema");

module.exports = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });
    passport.deserializeUser(function(id, done) {
        Enterprise.findById(id).exec() // Utilisation de exec() pour obtenir une promesse
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    passport.use(
        new GoogleStrategy({
            // clientID: "975274445366-87h3gtc3mm37tubh3efelbnj2fm4hbnp.apps.googleusercontent.com",
            // clientSecret: "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",
            // callbackURL: "http://localhost:3001/auth/google/callback",
    
        }, async function(accessToken, refreshToken, profile, cb) {
            console.log(profile);
            try {
                let user = await Enterprise.findOne({ googleId: profile.id });
                if (user) {
                    const updateUser = {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        logo: profile.photos[0].value,
                        secret: accessToken,
                    };
                    await Enterprise.findOneAndUpdate({ googleId: profile.id }, { $set: updateUser }, { new: true });
                    return cb(null, user);
                } else {
                    const newUser = new Enterprise({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        logo: profile.photos[0].value,
                        secret: accessToken,
                    });
                    await newUser.save();
                    return cb(null, newUser);
                }
            } catch (err) {
                return cb(err, null);
            }
        })
    );
};
