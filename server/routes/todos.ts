import { Router } from 'express'

import * as db from '../db/todosDb.ts'

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

router.post('/todos', async (req, res) => {
  try {
    const todo = req.body
    const newTodo = await db.createTodo(todo)
    console.log(newTodo)
    res.json(newTodo[0])
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
