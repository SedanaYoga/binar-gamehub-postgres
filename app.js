//////////////////////////////////////////////////////////////////////////////
// Module
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const {
  sequelize,
  UserGame,
  UserGameHistory,
  UserGameBiodata,
} = require('./models')
const findUsersHandler = require('./helpers/userHelper.js')

//////////////////////////////////////////////////////////////////////////////
//Variable
// --Listen Port
const PORT = 5000
// --State
let logProps = {
  isLogged: false,
  loggedAs: {
    uuid: '',
    userId: '',
    username: '',
  },
}

//////////////////////////////////////////////////////////////////////////////
// App Initialization
const app = express()
dotenv.config()

//////////////////////////////////////////////////////////////////////////////
// Middleware
// --Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// -- Static Directory Definition
app.use(express.static(path.join(__dirname, 'public')))
// --Third Party Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//////////////////////////////////////////////////////////////////////////////
// View Engine
app.set('view engine', 'ejs')

//////////////////////////////////////////////////////////////////////////////
// Endpoints
// -- Landing Page
app.get('/', async (req, res) => {
  try {
    if (logProps.isLogged === true) {
      const loggedUser = await UserGame.findOne({
        where: {
          uuid: logProps.loggedAs.uuid,
        },
      })
      if (!loggedUser) {
        logProps = {
          isLogged: false,
          loggedAs: {
            uuid: '',
            userId: '',
            username: '',
          },
        }
      }
    }
    res.render('home', { logProps })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// --Sign Up-----------------------------------------------------------------
app.get('/signup', (req, res) => {
  res.render('sign-in-up', { signType: 'up' })
})

app.post('/users', async (req, res) => {
  if (
    !req.body.username ||
    req.body.username === '' ||
    !req.body.email ||
    req.body.email === '' ||
    !req.body.password ||
    req.body.password === ''
  )
    res.status(400).json({ message: 'Please enter all user data' })
  const { username, email, password, confirmPassword } = req.body
  if (password !== confirmPassword) res.send("Password doesn't match!")

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

    logProps.isLogged = true
    logProps.loggedAs = {
      uuid: user.uuid,
      userId: user.id,
      username: user.username,
    }
    return res.redirect('/')
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
})

// --Sign In----------------------------------------------------------------
app.get('/signin', (req, res) => {
  res.render('sign-in-up', { signType: 'in' })
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
    if (!user || user.password !== password)
      res.send('Unable to login, wrong email or password')

    if (user !== null) {
      logProps.isLogged = true
      logProps.loggedAs.uuid = user.uuid
      logProps.loggedAs.userId = user.id
      logProps.loggedAs.username = user.username
      console.log(logProps)
      // return res.redirect('/')
      return res.redirect('/')
    } else {
      return res.redirect('/signin')
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
})

// --Log Out-------------------------------------------------------------------
app.get('/logout', (req, res) => {
  logProps = {
    isLogged: false,
    loggedAs: {
      uuid: '',
      userId: '',
      username: '',
    },
  }
  res.redirect('/')
})

// --Dashboard-----------------------------------------------------------------
app.get('/users', async (req, res) => {
  const users = await findUsersHandler([], 'all')
  return res.json(users)
})

app.get('/dashboard', async (req, res) => {
  try {
    const users = await findUsersHandler([], 'all')
    res.render('dashboard', { users })
  } catch (error) {
    console.log(error)
    return res.status(400).json(err)
  }
})

app.get('/users/:uuid/update', async (req, res) => {
  let errors = []
  if (req.query.error && req.query.error === 'invalid-input')
    errors.push('Please fill in username and email.')
  try {
    const user = await UserGame.findOne({
      where: {
        uuid: req.params.uuid,
      },
    })
    res.render('update-user', { user, errors })
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
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
    return res.redirect('/dashboard')
    // return res.status(200).json(
    //   await UserGame.findOne({
    //     where: {
    //       uuid: paramsUuid,
    //     },
    //     include: 'biodata',
    //   })
    // )
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})

app.get('/users/:uuid/delete', async (req, res) => {
  try {
    await UserGame.destroy({
      where: {
        uuid: req.params.uuid,
      },
    })
    await UserGameBiodata.destroy({
      where: {
        user_id: req.params.uuid,
      },
    })
    return res.redirect('/dashboard')
  } catch (error) {
    console.log(error)
    res.status(400).json('Something went wrong')
  }
})

// --Profile-------------------------------------------------------------------
app.get('/users/:uuid', async (req, res) => {
  const paramsUuid = req.params.uuid
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

    res.render('profile', { user, winCount, loseCount, drawCount })
  } catch (err) {
    console.log(err)
    return res.status(400).json('Something went wrong')
  }
})

// --Game---------------------------------------------------------------------
app.get('/game', (req, res) => {
  if (!logProps.isLogged) return res.redirect('/signin')
  res.render('rps')
})

app.post('/histories', async (req, res) => {
  const { score } = req.body
  try {
    await UserGameHistory.create({
      user_id: logProps.loggedAs.uuid,
      fk_userId_histories: logProps.loggedAs.userId,
      score: +score,
    })

    return res.status(200).json({ message: 'Successfully added score!' })
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
