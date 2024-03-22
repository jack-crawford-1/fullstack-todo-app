import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from 'react'
import { useTodos } from '../hooks/useTodos'

export default function TodosPage() {
  const { data, isLoading, error } = useTodos()

  const tasks = data?.tasks

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  console.log(tasks)

  return (
    <div>
      <h1>Todos</h1>

      <ul>
        {data?.map(
          (
            task:
              | string
              | number
              | boolean
              | ReactElement<unknown, string | JSXElementConstructor<unknown>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined,
            id: Key | null | undefined,
          ) => <li key={id}>{task}</li>,
        )}
      </ul>
    </div>
  )
}
