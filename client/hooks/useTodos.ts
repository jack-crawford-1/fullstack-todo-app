import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTodoFromDatabase, getTodos } from '../apis/todos.ts'

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

// export function useTodoMutation() {
//   const queryClient = useQueryClient()

//   const mutation = useMutation<string, Error, string, unknown>(
//     addTodoToDatabase,
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ['todos'] })
//       },
//     },
//   )

//   return mutation
// }

// Query functions go here e.g. useAddFruit
/* function useAddFruit() {
  return useFruitsMutation(addFruit)
} */
