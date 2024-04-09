import { useState } from 'react'
import { useAddTodo, useTodos } from '../hooks/useTodos'
import { useAuth0 } from '@auth0/auth0-react'

function TodoForm() {
  const { isLoading, error } = useTodos()
  const { getAccessTokenSilently } = useAuth0()
  const addTodo = useAddTodo()
  const [inputValue, setinputValue] = useState('')

  const handleSubmit = async (task: string) => {
    try {
      const token = await getAccessTokenSilently()
      await addTodo.mutateAsync(
        { task },
        {
          onSuccess: () => {
            console.log('Added todo:', task)
          },
        },
        token,
      )
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <form
      aria-label="todo-form"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(inputValue)
        setinputValue('')
      }}
    >
      <label htmlFor="todo-input">New Task</label>
      <input
        id="todo-input"
        type="text"
        className="todos"
        value={inputValue}
        placeholder="Add New Todo Item"
        onChange={(e) => setinputValue(e.target.value)}
      />
    </form>
  )
}

export default TodoForm
