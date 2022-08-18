// creating token and saving in cookie
module.exports = function (statusCode, user, res) {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      // getting cookie expire from env as who many days
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
