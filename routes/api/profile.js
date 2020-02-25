const express = require('express')

const router = express.Router()
const auth = require('../../middleware/auth')

const { check, validationResult } = require('express-validator')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route   GET api/profile/me
// @desc    Получение профиля текушего пользователя
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar'])
    if (profile) {
      return res.json(profile)
    }

    return res.status(400).json({
      msg: 'Для этого пользователя нет профиля'
    })
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
})

// @route   POST api/profile
// @desc    Создание или обновление профиля пользователя
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Поле статус обязательное')
        .not()
        .isEmpty(),
      check('skills', 'Поле навыков обязательное')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      const {
        company,
        website,
        location,
        bio,
        status,
        skills,
        youtube,
        facebook,
        vk,
        instagram
      } = req.body

      const profileFields = {}
      profileFields.user = req.user.id

      if (company) profileFields.company = company
      if (website) profileFields.website = website
      if (location) profileFields.location = location
      if (bio) profileFields.bio = bio
      if (status) profileFields.status = status
      if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
      }

      profileFields.social = {}
      if (youtube) profileFields.social.youtube = youtube
      if (facebook) profileFields.social.facebook = facebook
      if (vk) profileFields.social.vk = vk
      if (instagram) profileFields.social.instagram = instagram

      try {
        let profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
          profile = await Profile.findOneAndUpdate(
            {
              user: req.user.id
            },
            { $set: profileFields },
            { new: true }
          )

          return res.json(profile)
        }

        profile = new Profile(profileFields)
        await profile.save()

        return res.json(profile)
      } catch (err) {
        console.error(err.message)

        res.send(500).send('Server Error')
      }
    }

    res.status(400).json({
      errors: errors.array()
    })
  }
)

// @route   GET api/profile
// @desc    Получение всех профилей
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])

    res.json(profiles)
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
})

// @route   GET api/profile/user/:user_id
// @desc    Получение профиля по id пользователя
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar'])

    if (profile) {
      return res.json(profile)
    }

    res.status(400).json({ msg: 'Профиль не найден' })
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Профиль не найден' })
    }

    res.status(500).send('Server Error')
  }
})

// @route   DELETE api/profile
// @desc    Удаление профиля, пользователя и постов
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id })

    await User.findOneAndRemove({ _id: req.user.id })

    res.json({ msg: 'Пользователь удален' })
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
})

// @route   PUT api/profile/experience
// @desc    Добавление в профиль опыта
// @access  Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Заголовок обязателен')
        .not()
        .isEmpty(),
      check('company', 'Название компании обязательно')
        .not()
        .isEmpty(),
      check('from', 'Поле обязательное')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      } = req.body

      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      }

      try {
        const profile = await Profile.findOne({ user: req.user.id })

        profile.experience.unshift(newExp)
        await profile.save()

        return res.json(profile)
      } catch (err) {
        console.error(err.message)

        res.status(500).send('Server Error')
      }
    }

    res.status(400).json({
      errors: errors.array()
    })
  }
)

// @route   DELETE api/profile/experience/exp_id
// @desc    Удаление опыта из профиля
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    })

    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id)

    profile.experience.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
})

// @route   PUT api/profile/education
// @desc    Добавление в профиль образования
// @access  Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'Заголовок обязателен')
        .not()
        .isEmpty(),
      check('degree', 'Уровень образования обязательно')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Поле обязательное')
        .not()
        .isEmpty(),
      check('from', 'Поле обязательное')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      } = req.body

      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      }

      try {
        const profile = await Profile.findOne({ user: req.user.id })

        profile.education.unshift(newEdu)
        await profile.save()

        return res.json(profile)
      } catch (err) {
        console.error(err.message)

        res.status(500).send('Server Error')
      }
    }

    res.status(400).json({
      errors: errors.array()
    })
  }
)

// @route   DELETE api/profile/education/edu_id
// @desc    Удаление образования из профиля
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    })

    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id)

    profile.education.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
})

module.exports = router
