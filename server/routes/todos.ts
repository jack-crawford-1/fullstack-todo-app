import { Router } from 'express'

import * as db from '../db/todos.ts'

const router = Router()

router.get('/todos', async (req, res) => {
  try {
    const todos = await db.getAllTodos()
    res.json({
      tasks: todos.map((todo) => todo.task),
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'something went wrong' })
  }
})

export default router

// TODO 4
// build out the route function that links in routes file
//  file is located at routes/fruits.ts
// it takes async function from db/fruits.ts
// and then returns (res) the data which is stored as a promise

// Implement the API route (server/routes/fruits.ts): Create the routes that will use your database access functions to respond to API requests.
