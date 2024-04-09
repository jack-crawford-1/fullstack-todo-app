import { Router } from 'express'

import * as db from '../db/todosDb.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

const router = Router()

router.get('/todos', async (req, res) => {
  try {
    const todos = await db.getAllTodos()
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
  const { todo } = req.body
  const auth0Id = req.auth?.sub
  if (!todo) {
    console.error('No todos found in request')
    return res.status(400).json({ message: 'No todos found in request' })
  }

  if (!auth0Id) {
    console.error('No auth0Id found in request')
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const newTodo = await db.createTodo(todo, auth0Id)

    res.json(newTodo[0])
  } catch (error) {
    console.log(error)
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
