import { useDeleteTodo, useTodos } from '../hooks/useTodos'
import { deleteTodoFromDatabase } from '../apis/todos'
import { Todo } from '../../models/todo'

// interface Props {
//   handleDelete: (id: number) => void
// }

function TodosPage() {
  const { data, isLoading, error } = useTodos()
  // the hook _must_ be called in your component, but outside of your callback
  const deleteTodo = useDeleteTodo()
  const handleDelete = async (id: number) => {
    deleteTodo.mutate({ id })
    try {
      await deleteTodoFromDatabase(id)

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
        {data?.map((todo: Todo) => (
          <li key={todo.id}>
            <button onClick={() => handleDelete(todo.id as number)}>
              Delete
            </button>
            {todo.task}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodosPage
