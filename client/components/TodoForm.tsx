import { useState } from 'react'
import { useAddTodo, useTodos } from '../hooks/useTodos'

function TodoForm() {
  const { isLoading, error } = useTodos()
  const addTodo = useAddTodo()
  const [inputValue, setinputValue] = useState('')

  const handleSubmit = async (task: string) => {
    addTodo.mutate({ task })
    try {
      console.log('Added todo:', task)
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
