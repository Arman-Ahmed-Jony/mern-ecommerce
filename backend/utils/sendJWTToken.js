// creating token and saving in cookie
module.exports = function (statusCode, user, res) {
  const token = user.getJWTToken()
  const refreshToken = user.getRefreshToken()
  const options = {
    expires: new Date(
      // getting cookie expire from env as who many days
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  res.status(statusCode).cookie('token', token, options)
    .cookie('refresh-token', refreshToken)
    .cookie('user', JSON.stringify({email: user.email, name: user.name, avatar: user.avatar, role: user.role, _id: user._id}))
    .json({
    success: true,
    user,
    token,
    refreshToken
  })
}
