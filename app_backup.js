// Module
const express = require('express')
const { sequelize, UserGame, UserGameHistory } = require('./models')

//Variable
const PORT = 5000

// Express App
const app = express()

// Middleware
// --Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/users', async (req, res) => {
  const { username, email, password } = req.body

  try {
    const user = await UserGame.create({ username, email, password })

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await UserGame.findAll()

    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.get('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid

  try {
    const user = await UserGame.findOne({
      where: { uuid },
      include: 'histories',
    })

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.post('/histories', async (req, res) => {
  const { userUuid, score, tgl_main } = req.body

  try {
    const user = await UserGame.findOne({
      where: { uuid: userUuid },
    })

    const history = await UserGameHistory.create({
      score,
      tgl_main,
      userId: user.id,
    })

    return res.json(history)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/histories', async (req, res) => {
  try {
    const histories = await UserGameHistory.findAll({
      include: 'user',
    })
    return res.json(histories)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.delete('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const user = await UserGame.findOne({
      where: { uuid },
    })
    await user.destroy()
    return res.json({ message: 'User is deleted successfully' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.put('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  const { username, email, password } = req.body

  try {
    const user = await UserGame.findOne({
      where: { uuid },
    })

    user.username = username
    user.email = email
    user.password = password

    await user.save()

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  await sequelize.authenticate()
  console.log('Database Connected!')
})
