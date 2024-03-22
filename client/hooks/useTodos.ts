import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { getTodos } from '../apis/fruits.ts'

export function useTodos() {
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  return {
    ...query,
  }
}

// export function useFruitsMutation<TData = unknown, TVariables = unknown>(
//   mutationFn: MutationFunction<TData, TVariables>,
// ) {
//   const queryClient = useQueryClient()
//   const mutation = useMutation({
//     mutationFn,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['fruits'] })
//     },
//   })

//   return mutation
// }

// Query functions go here e.g. useAddFruit
/* function useAddFruit() {
  return useFruitsMutation(addFruit)
} */
