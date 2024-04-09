import { Todo } from '../../models/todoModel'

const rootUrl = '/api/v1'

export async function getTodos() {
  try {
    const response = await fetch(`${rootUrl}/todos`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  } catch (error) {
    throw new Error('Failed to get todos: ' + error.message)
  }
}

export async function editTodoInDatabase(id: number, task: string) {
  try {
    const response = await fetch(`/api/v1/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    console.log('response', response)
    return response.json()
  } catch (error) {
    throw new Error('Failed to edit todo: ' + error)
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

export async function addTodoToDatabase(
  todo: Todo,
  token: string,
): Promise<Todo> {
  try {
    const response = await fetch('/api/v1/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(todo),
    })
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${error.message}`)
    }
    return response.json()
  } catch (error) {
    throw new Error('Failed to add todo: ' + error)
  }
}
