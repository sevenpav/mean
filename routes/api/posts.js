const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const Post = require('../../models/Post')
const User = require('../../models/User')

// @route   POST api/posts
// @desc    Создание поста
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Поле обязательно к заполнению')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      try {
        const user = await User.findById(req.user.id).select('-password')

        const newPost = new Post({
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        })

        const post = await newPost.save()

        return res.json(post)
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
      }
    }

    res.status(400).json({ errors: errors.array() })
  }
)

// @route   GET api/posts
// @desc    Получение всех постов
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({
      date: -1
    })

    res.json(posts)
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server error')
  }
})

// @route   GET api/posts/:id
// @desc    Получение поста по id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (post) {
      return res.json(post)
    }

    res.status(404).json({ msg: 'Пост не найден' })
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'objectId') {
      return res.status(404).json({ msg: 'Пост не найден' })
    }
    res.status(500).send('Server error')
  }
})

// @route   DELETE api/posts/:id
// @desc    Удаление поста по id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ msg: 'Пост не найден' })
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Пользователь не авторизован' })
    }

    await post.remove()

    res.json({ msg: 'Пост удален' })
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'objectId') {
      return res.status(404).json({ msg: 'Пост не найден' })
    }
    res.status(500).send('Server error')
  }
})

// @route   PUT api/posts/like/:id
// @desc    Лайк поста
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Пост уже имеет лайк' })
    }

    post.likes.unshift({ user: req.user.id })

    await post.save()

    res.json(post.likes)
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server error')
  }
})

// @route   PUT api/posts/unlike/:id
// @desc    Удаление лайка с поста
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Пост не имеет вашего лайка' })
    }

    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id)

    post.likes.splice(removeIndex, 1)

    await post.save()

    res.json(post.likes)
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server error')
  }
})

// @route   POST api/posts/comment/:id
// @desc    Комментирование поста
// @access  Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Поле обязательно к заполнению')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      try {
        const user = await User.findById(req.user.id).select('-password')

        const post = await Post.findById(req.params.id)

        const newComment = {
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        }

        post.comments.unshift(newComment)

        await post.save()

        return res.json(post.comments)
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
      }
    }

    res.status(400).json({ errors: errors.array() })
  }
)

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Удаление комментария
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    )

    if (!comment) {
      return res.status(404).json({ msg: 'Комментария нет' })
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Пользователь не авторизован' })
    }

    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id)

    post.comments.splice(removeIndex, 1)

    await post.save()

    res.json(post.comments)
  } catch (err) {
    console.error(err.message)

    res.send(500).send('Server error')
  }
})

module.exports = router
