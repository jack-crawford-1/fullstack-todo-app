import { useMutation } from '@tanstack/react-query'
import { login } from '../../server/db/loginDb.ts'

export function useLogin() {
  return useMutation({
    mutationFn: (params: { username: string; password: string }) =>
      login(params.username, params.password),
  })
}
