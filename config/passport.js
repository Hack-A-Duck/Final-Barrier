const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const Passmodel = require('../Models/passM')
// const mongoose = require('mongoose')

// const Passmodel = require('../Models/passM')
// // const { model } = require('../Models/passM')

// module.exports = function (passport) {


//     passport.use(new LocalStrategy(
//         function (email, password, done) {
//             Passmodel.findOne({ username: email }, function (err, user1) {
//                 if (err) { return done(err); }
//                 if (!user1) {
//                     return done(null, false, { message: 'Incorrect username.' });
//                 }
//                 if (!user1.validPassword(password)) {
//                     return done(null, false, { message: 'Incorrect password.' });
//                 }
//                 return done(null, user1);
//             });
//         }
//     ));

//     passport.serializeUser(function (user, done) {
//         done(null, user.id);
//     });

//     passport.deserializeUser(function (id, done) {
//         User.findById(id, function (err, user) {
//             done(err, user);
//         });
//     });

// }


function initialize(passport, getUserByEmail) {
    const authenticateUser = async (email, password, done) => {
        const user = await Passmodel.findOne({email:email})
        // console.log(user)
        if (user == null) {
            return done(null, false, { message: "No user with the email" })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: "password incorrect" })
            }

        } catch (error) {
            return done(error)
        }
        
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => { done(null, user.id) });

    passport.deserializeUser((id, done) => {
        return done(null, Passmodel.findOne({_id:id}))
    });
}

module.exports = initialize