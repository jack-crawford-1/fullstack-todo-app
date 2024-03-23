import { useDeleteTodo, useTodos } from '../hooks/useTodos'
import { deleteTodoFromDatabase } from '../apis/todos'
import { Todo } from '../../models/todo'
import TodoForm from './TodoForm'
import { Link } from 'react-router-dom'

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
    <div className="container">
      <h1>Todos</h1>
      <TodoForm />
      <ul className="todo-list">
        {data?.map((todo: Todo) => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => handleDelete(todo.id as number)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Link to="/" className="btn btn-primary">
        {' '}
        <button>Home </button>
      </Link>
    </div>
  )
}

export default TodosPage
