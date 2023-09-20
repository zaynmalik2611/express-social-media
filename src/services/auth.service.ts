const googleLoginOrSignUp = async (googleProfile: any, cb) => {
  if (userExists(googleProfile.googleId)) {
    // User exists, fetch the user and call the callback
    getUserByGoogleId(googleProfile.googleId, function (err, user) {
      if (err) {
        return cb(err);
      }
      return cb(null, user);
    });
  } else {
    // User does not exist, create a new user (you'll need to define this function)
    createNewUser(googleProfile, function (err, newUser) {
      if (err) {
        return cb(err);
      }
      return cb(null, newUser);
    });
  }
};
