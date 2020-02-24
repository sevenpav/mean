const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token')

  if (token) {
    try {
      const decoded = jwt.verify(token, config.get('jwtToken'))

      req.user = decoded.user
      next()
    } catch (err) {
      res.status(401).json({ msg: 'Невалидный токен' })
    }
  } else {
    return res.status(401).json({ msg: 'Нет токена, авторизация отклонена' })
  }
}
