import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  addTodoToDatabase,
  deleteTodoFromDatabase,
  editTodoInDatabase,
  getTodos,
} from '../apis/todos.ts'
import { Todo } from '../../models/todoModel.ts'
import { useAuth0 } from '@auth0/auth0-react'

export function useTodos() {
  const { getAccessTokenSilently } = useAuth0()

  const fetchTodos = async ({ queryKey }: { queryKey: string[] }) => {
    const rootUrl = '/api/v1'
    const token = await getAccessTokenSilently()
    const response = await fetch(`${rootUrl}/${queryKey[0]}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorResult = await response.json()
      throw new Error(errorResult.message || 'Network response was not ok')
    }

    return response.json()
  }

  const query = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  return query
}

export function useEditTodo() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, task }: { id: number; task: string }) => {
      return await editTodoInDatabase(id, task)
    },
    onMutate: async (newTodo) => {
      await client.cancelQueries({ queryKey: ['todos'] })
      return newTodo
    },
    onSettled: () => {
      client.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

export function useDeleteTodo() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: async (params: { id: number }) => {
      await deleteTodoFromDatabase(params.id)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

export function useAddTodo() {
  const client = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async (params: { task: string }) => {
      const token = await getAccessTokenSilently()
      const todoToAdd: Todo = {
        id: 0,
        task: params.task,
        isCompleted: false,
      }
      await addTodoToDatabase(todoToAdd, token)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
