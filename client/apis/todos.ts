//  5 call the data from the client side
//Call the API from the client (client/api/fruits.ts): Use the client-side code to interact with the API set up.

import { Todo } from '../../models/todoModel'

export async function getTodos() {
  try {
    const response = await fetch('/api/v1/todos')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const result = await response.json()
    return result.tasks
  } catch (error) {
    throw new Error('Failed to fetch todos: ' + error)
  }
}

export async function deleteTodoFromDatabase(
  id: number,
): Promise<ResponseType> {
  try {
    const response = await fetch(`/api/v1/todos/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  } catch (error) {
    throw new Error('Failed to delete todo: ' + error)
  }
}

export async function addTodoToDatabase(todo: Todo): Promise<Todo> {
  try {
    const response = await fetch('/api/v1/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  } catch (error) {
    throw new Error('Failed to add todo: ' + error)
  }
}
