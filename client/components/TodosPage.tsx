import { useDeleteTodo, useEditTodo, useTodos } from '../hooks/useTodos'
import { deleteTodoFromDatabase, editTodoInDatabase } from '../apis/todos'
import { Todo } from '../../models/todoModel'
import TodoForm from './TodoForm'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function TodosPage() {
  const { data, isLoading, error } = useTodos()
  const [editTask, setEditTask] = useState('')
  const [editTodoId, setEditTodoId] = useState(null)
  const deleteTodo = useDeleteTodo()
  const editTodo = useEditTodo()

  const handleEdit = async (id: number) => {
    try {
      await editTodoInDatabase(id, editTask)
      editTodo.mutate(data)
      setEditTodoId(null)
      setEditTask('')
    } catch (error) {
      console.error('Failed to edit todo:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTodoFromDatabase(id)
      deleteTodo.mutate({ id })
      console.log('Deleted todo:', id)
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
          <li key={todo.id} className="todo-item">
            {editTodoId === todo.id ? (
              <input
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
              />
            ) : (
              <span className="todo-task">{todo.task}</span>
            )}

            <div className="buttons-container">
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
              {editTodoId === todo.id ? (
                <button onClick={() => handleEdit(todo.id)}>Save</button>
              ) : (
                <button
                  onClick={() => {
                    setEditTodoId(todo.id)
                    setEditTask(todo.task)
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <Link to="/" className="btn btn-primary">
        <button>Home</button>
      </Link>
    </div>
  )
}

export default TodosPage
