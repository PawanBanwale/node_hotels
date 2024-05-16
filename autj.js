
// authentication
const Person = require('./modals/Person')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy



passport.use(new localStrategy(async (USERNAME, PASSWORD, done) => {
  try {
    console.log('Authenticating user...');
    const user = await Person.findOne({ username: USERNAME });
    if (!user) {
      console.log('User not found');
      return done(null, false, { message: 'User not found' });
    }
    console.log(user)
    console.log("password checking")
    const isPasswordMatch = await user.comparePassword(PASSWORD)
    console.log("password checked")
    if (isPasswordMatch) {
      console.log('Authentication successful');
      return done(null, user);
    } else {
      console.log('Incorrect password');
      return done(null, false, { message: 'Incorrect password' });
    }
  } catch (err) {
    console.error('Authentication error:', err);
    return done(err);
  }
}));

module.exports = passport

