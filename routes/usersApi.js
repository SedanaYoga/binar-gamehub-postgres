const express = require('express')
const router = express.Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const db = require('../db/users.json')

let users = db
router.use(express.json())

// Middleware
const userNotFoundMdw = (req, res, next) => {
  const existingUser = users.find((u) => u.id === req.params.id)
  if (!existingUser) res.status(400).json({ message: 'User not found!' })
  next()
}

router.get('/', (req, res) => {
  res.status(200).json(users)
})

router.get('/length', (req, res) => {
  res.status(200).json({ userLength: +users.length })
})

router.post('/', (req, res) => {
  if (
    !req.body.username ||
    req.body.username === '' ||
    !req.body.email ||
    req.body.email === '' ||
    !req.body.password ||
    req.body.password === ''
  )
    res.status(400).json({ message: 'Please enter all user data' })
  const { username, email, password } = req.body
  const existingUser = users.find((u) => u.username === username)

  if (existingUser) res.status(400).json({ message: 'User is already exist!' })
  const id = uuidv4()
  const newUser = { id, username, email, password }
  users.push(newUser)
  fs.writeFileSync('./db/users.json', JSON.stringify(users))
  res.status(200).json(newUser)
})

router.get('/:id', userNotFoundMdw, (req, res) => {
  const existingUser = users.find((u) => u.id === req.params.id)
  res.status(200).json(existingUser)
})

router.put('/:id', userNotFoundMdw, (req, res) => {
  const existingUser = users.find((u) => u.id === req.params.id)
  const params = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }
  existingUser = { ...existingUser, ...params }
  users = users.map((u) => (u.id === existingUser.id ? existingUser : u))
  res.status(200).json(users)
})

router.delete('/:id', userNotFoundMdw, (req, res) => {
  users = users.filter((u) => u.id !== req.params.id)
  res
    .status(200)
    .json({ message: `User with id ${req.params.id} is successfully deleted` })
})

module.exports = router
