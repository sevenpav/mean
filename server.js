const path = require('path')
const express = require('express')
const connectDB = require('./config/db')
const app = express()

const usersRoutes = require('./routes/api/users')
const authRoutes = require('./routes/api/auth')
const profileRoutes = require('./routes/api/profile')
const postsRoutes = require('./routes/api/posts')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

connectDB()

app.use(express.json({ extended: false }))

app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/posts', postsRoutes)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
