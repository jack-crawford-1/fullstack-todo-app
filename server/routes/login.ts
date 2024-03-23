import express, { Router } from 'express'

import * as db from '../db/loginDb.ts'

const router = Router()
const loginRouter = require('./routes/login.ts')

router.use(express.json())
router.use(loginRouter)

router.post('login', async (req, res) => {
  const { username, password } = req.body
  const user = await db.findUserByUsername(username)

  if (user && user.Password === password) {
    res.json({ message: 'Success', user: user.username })
  } else {
    res
      .status(401)
      .json({ message: 'Login failed: Incorrect username or password' })
  }
})

export default router
