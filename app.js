//////////////////////////////////////////////////////////////////////////////
// Module
const express = require('express')
const {
  sequelize,
  UserGame,
  UserGameHistory,
  UserGameBiodata,
} = require('./models')
const findUsersHandler = require('./helpers/userHelper.js')

//////////////////////////////////////////////////////////////////////////////
//Variable
const PORT = 5000
// --State
const logProps = {
  isLogged: false,
  loggedAs: {
    uuid: '12578a17-e881-4aa3-ab5c-18dfcd1e7a13',
    userId: '2',
  },
}

//////////////////////////////////////////////////////////////////////////////
// Express App
const app = express()

//////////////////////////////////////////////////////////////////////////////
// Middleware
// --Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// -- Core
app.use('public', express.static('public'))

//////////////////////////////////////////////////////////////////////////////
// Endpoints

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/users', async (req, res) => {
  const { username, email, password } = req.body
  try {
    const user = await UserGame.create({
      username,
      email,
      password,
    })

    await UserGameBiodata.create({
      user_id: user.uuid,
      fk_userId_biodata: user.id,
    })

    // return res.redirect('/dashboard')
    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
})

app.post('/signin', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserGame.findOne({
      where: {
        email,
        password,
      },
    })
    if (user !== null) {
      // return res.redirect(`/game?id=${user.id}`)
      logProps.isLogged = true
      logProps.loggedAs.uuid = user.uuid
      logProps.loggedAs.userId = user.id
      console.log(logProps)
      return res.redirect('/')
    } else {
      return res.redirect('signin')
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
})

app.get('/users', async (req, res) => {
  const users = await findUsersHandler([], 'all')
  res.status(200).json(users)
})

app.get('/users/:uuid', async (req, res) => {
  const paramsUuid = req.params.uuid
  let profileData = {}
  try {
    const user = await findUsersHandler(
      ['biodata', 'histories'],
      'one',
      paramsUuid
    )
    const winCount = user.histories.filter((e) => e.score > 0).length.toString()
    const loseCount = user.histories
      .filter((e) => e.score < 0)
      .length.toString()
    const drawCount = user.histories
      .filter((e) => (e.score = 0))
      .length.toString()

    res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(400).json('Something went wrong')
  }
})

app.get('/dashboard', async (req, res) => {
  const users = await findUsersHandler(['biodata', 'histories'], 'all')
  res.status(200).json(users)
})

app.post('/users/:uuid/update', async (req, res) => {
  const { username, email, full_name, dob, address, contact } = req.body
  const paramsUuid = req.params.uuid
  if (email === '' || email === null || username === '' || username === null) {
    res.redirect(`/users/${paramsUuid}/update?error=invalid-input`)
  }
  try {
    await UserGame.update(
      {
        email,
        username,
      },
      {
        where: {
          uuid: paramsUuid,
        },
      }
    )
    await UserGameBiodata.update(
      {
        full_name,
        dob,
        address,
        contact,
      },
      {
        where: {
          user_id: paramsUuid,
        },
      }
    )
    // return res.redirect('/dashboard')
    return res.status(200).json(
      await UserGame.findOne({
        where: {
          uuid: paramsUuid,
        },
        include: 'biodata',
      })
    )
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})

app.get('/game', (req, res) => {})

app.post('/histories', async (req, res) => {
  const { score } = req.body
  try {
    await UserGameHistory.create({
      user_id: logProps.loggedAs.uuid,
      fk_userId_histories: logProps.loggedAs.userId,
      score,
    })

    return res.status(200).json({ message: 'Successfully added score!' })
  } catch (error) {
    console.log(error)
    res.status(400).json('Something went wrong')
  }
})

app.delete('/users/:uuid/delete', async (req, res) => {
  try {
    await UserGame.destroy({
      where: {
        uuid: req.params.uuid,
      },
    })
    return res.redirect('/dashboard')
  } catch (error) {
    console.log(error)
    res.status(400).json('Something went wrong')
  }
})

/////////////////////////////////////////////////////////////////////////////
// Listen the Server at PORT variable

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  await sequelize.authenticate()
  console.log('Database Connected!')
})
