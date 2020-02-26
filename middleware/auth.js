const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ msg: 'Нет токена, авторизация отклонена' })
  }

  try {
    await jwt.verify(token, config.get('jwtToken'), (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: 'Невалидный токен' })
      } else {
        req.user = decoded.user
        next()
      }
    })
  } catch (err) {
    console.error('Ошибка в auth middleware')
    res.status(500).json({ msg: 'Server Error' })
  }
}
