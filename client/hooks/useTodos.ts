import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  addTodoToDatabase,
  deleteTodoFromDatabase,
  editTodoInDatabase,
  getTodos,
} from '../apis/todos.ts'
import { Todo } from '../../models/todoModel.ts'

export function useTodos() {
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  return {
    ...query,
  }
}

//EDIT TODO

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
// DELETE TODO
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

// ADD TODO

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
