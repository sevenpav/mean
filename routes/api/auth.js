const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')

// @route   GET api/auth
// @desc    Получение пользователя по токену
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
})

// @route   POST api/auth
// @desc    Авторизация пользователя & получение токена
// @access  Public
router.post(
  '/',
  [
    check('email', 'Напишите валидные email').isEmail(),
    check('password', 'Пароль обязателен к заполнению').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      const { email, password } = req.body

      try {
        let user = await User.findOne({
          email
        })

        if (user) {
          const isMatch = await bcrypt.compare(password, user.password)

          if (!isMatch) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'Неверный пароль' }] })
          }

          const payload = {
            user: {
              id: user.id
            }
          }

          jwt.sign(
            payload,
            config.get('jwtToken'),
            {
              expiresIn: 360000
            },
            (err, token) => {
              if (err) throw err

              res.json({ token })
            }
          )
        } else {
          res
            .status(400)
            .json({ errors: [{ msg: 'Неверный email или пароль' }] })
        }
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
      }
    } else {
      return res.status(400).json({ errors: errors.array() })
    }
  }
)

module.exports = router
