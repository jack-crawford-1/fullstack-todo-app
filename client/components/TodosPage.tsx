import { useState, useEffect } from 'react'
import { useTodos } from '../hooks/useTodos'
import { deleteTodoFromDatabase } from '../apis/todos'

interface Props {
  handleDelete: (id: number) => void
}

function TodosPage() {
  const { data, isLoading, error } = useTodos()
  const [tasks, setTasks] = useState<ResponseType[]>([])

  useEffect(() => {
    if (tasks) {
      setTasks(tasks)
    }
  }, [tasks])

  const handleDelete = async (id: number) => {
    try {
      await deleteTodoFromDatabase(id)
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
      console.log('Deleted todo:', id) // showing id as index instead of id
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>Todos</h1>

      <ul>
        {data?.map((task: string, id: number) => (
          <li key={id}>
            {task}
            <button onClick={() => handleDelete(id as number)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodosPage
