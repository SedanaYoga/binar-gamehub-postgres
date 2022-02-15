// Module
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const { sequelize } = require('./models')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')
const {
  renderHomePage,
} = require('./controller/portal/landingPageController.js')
const {
  renderSignInPage,
  signInControl,
} = require('./controller/portal/signInController.js')
const {
  renderSignUpPage,
  signUpControl,
} = require('./controller/portal/signUpController.js')
const { logOutControl } = require('./controller/portal/logOutController.js')
const {
  getAllUsersControl,
  renderDashboardPage,
  renderUpdateUser,
  updateUserControl,
  deleteUserControl,
} = require('./controller/portal/dashboardController.js')
const {
  renderProfilePage,
} = require('./controller/portal/profileController.js')
const {
  renderGamePage,
  addHistoryControl,
} = require('./controller/portal/gameController.js')
const routerApi = require('./routes/version/apiV1.js')

//////////////////////////////////////////////////////////////////////////////
//Variable
// --Listen Port
const PORT = 5000

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
app.get('/', renderHomePage)

// --Sign Up-----------------------------------------------------------------
app.get('/signup', renderSignUpPage)
app.post('/users', signUpControl)

// --Sign In----------------------------------------------------------------
app.get('/signin', renderSignInPage)
app.post('/signin', signInControl)

// --Log Out-------------------------------------------------------------------
app.get('/logout', logOutControl)

// --Dashboard-----------------------------------------------------------------
app.get('/users', getAllUsersControl)
app.get('/dashboard', renderDashboardPage)
app.get('/users/:uuid/update', renderUpdateUser)
app.post('/users/:uuid/update', updateUserControl)
app.get('/users/:uuid/delete', deleteUserControl)

// --Profile-------------------------------------------------------------------
app.get('/users/:uuid', renderProfilePage)

// --Game---------------------------------------------------------------------
app.get('/game', renderGamePage)
app.post('/histories', addHistoryControl)

// --API EXPLORER-------------------------------------------------------------
app.use('/api/v1', routerApi)

// --Error Handler------------------------------------------------------------
app.use(notFound)
app.use(errorHandler)

/////////////////////////////////////////////////////////////////////////////
// Listen the Server at PORT variable

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  await sequelize.authenticate()
  console.log('Database Connected!')
})
