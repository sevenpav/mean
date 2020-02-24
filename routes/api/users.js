const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('config')

const User = require('../../models/User')

// @route  POST api/users
// @desc   Регистрация пользователя
// @access Public
router.post(
  '/',
  [
    check('name', 'Имя обязательно')
      .not()
      .isEmpty(),
    check('email', 'Напишите валидные email').isEmail(),
    check('password', 'Введите пароль, не меньше 6 символов').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      const { name, email, password } = req.body

      try {
        let user = await User.findOne({
          email
        })

        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Пользователь уже существует' }] })
        }

        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        })

        user = new User({
          name,
          email,
          avatar,
          password
        })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()

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
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
      }
    } else {
      return res.status(400).json({ errors: errors.array() })
    }
  }
)

module.exports = router
