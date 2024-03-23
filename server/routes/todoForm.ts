import { Router } from 'express'

import * as db from '../db/todos.ts'

const router = Router()

router.post('/todoForm', async (req, res) => {
  try {
    const { task } = req.body
    if (!task) {
      return res.status(400).json({ message: 'Task is required' })
    }
    const newTodo = await db.addTodo(task)
    res.status(201).json(newTodo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
