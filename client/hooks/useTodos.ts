import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { getTodos } from '../apis/todos.ts'
// import addTodoToDatabase from '../services/todoServices.ts'

export function useTodos() {
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  return {
    ...query,
  }
}

type ResponseType = {
  tasks: string[]
}

export function useTodoMutation() {
  const queryClient = useQueryClient()

  const mutation = useMutation<string, Error, string, unknown>(
    addTodoToDatabase,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      },
    },
  )

  return mutation
}

export async function addTodoToDatabase(
  newTodo: string,
): Promise<ResponseType> {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task: newTodo }),
  })
  return response.json()
}

// Query functions go here e.g. useAddFruit
/* function useAddFruit() {
  return useFruitsMutation(addFruit)
} */
