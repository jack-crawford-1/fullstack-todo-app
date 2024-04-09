import { Router } from 'express'

import * as db from '../db/todosDb.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

const router = Router()

router.get('/todos', checkJwt, async (req: JwtRequest, res) => {
  try {
    const userId = req.auth?.sub
    if (!userId) {
      return res.status(401).json({ message: 'User ID not found' })
    }
    const todos = await db.getAllTodos(userId)
    res.json({
      tasks: todos.map((todo) => ({
        id: todo.id,
        task: todo.task,
      })),
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'something went wrong' })
  }
})

router.post('/todos', checkJwt, async (req: JwtRequest, res) => {
  const { task, isCompleted } = req.body
  const auth0Id = req.auth?.sub

  try {
    const newTodo = await db.createTodo({
      task,
      isCompleted,
      user_id: auth0Id,
    })

    res.status(201).json(newTodo)
  } catch (error) {
    console.error('Failed to add todo:', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/todos/:id', async (req, res) => {
  const { id } = req.params
  const { task } = req.body

  try {
    const updatedTodo = await db.updateTodoById(Number(id), task)

    res.json(updatedTodo)
  } catch (error) {
    res.status(500).json({ message: 'Failed to update todo' })
  }
})

router.delete('/todos/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteTodoById(id)
    res.json({ message: 'Todo deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
