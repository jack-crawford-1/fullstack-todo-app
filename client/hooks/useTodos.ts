import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  addTodoToDatabase,
  deleteTodoFromDatabase,
  getTodos,
} from '../apis/todos.ts'
import { Todo } from '../../models/todoModel.ts'

export function useTodos() {
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  return {
    ...query,
  }
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
  return useMutation({
    mutationFn: async (params: { task: string }) => {
      const todoToAdd: Todo = {
        task: params.task,
        id: 0,
      }
      await addTodoToDatabase(todoToAdd)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

// Query functions go here e.g. useAddFruit
/* function useAddFruit() {
  return useFruitsMutation(addFruit)
} */
