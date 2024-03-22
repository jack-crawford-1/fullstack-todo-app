import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from 'react'
import { useTodos } from '../hooks/useTodos'
import TodoForm from './TodoForm'

export default function TodosPage() {
  const { data, isLoading, error } = useTodos()

  const handleOnSubmit = (value: string) => {
    console.log('value:', value)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>Todos</h1>
      <TodoForm handleOnSubmit={handleOnSubmit} />
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
