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
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3002/auth/google/callback",
    
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
