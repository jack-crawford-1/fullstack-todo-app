import { Link } from 'react-router-dom'

import { useDeleteTodo, useEditTodo, useTodos } from '../hooks/useTodos'
import { deleteTodoFromDatabase, editTodoInDatabase } from '../apis/todos'
import { Todo } from '../../models/todoModel'
import TodoForm from './TodoForm'
import { useState } from 'react'

export default function Home() {
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

  if (data?.length === 0) {
    return <div>You have no todos.</div>
  }
  return (
    <div className="home-container">
      <div className="container">
        <TodoForm />
        <ul className="todo-list">
          {data?.tasks.map((todo: Todo) => (
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
      </div>
    </div>
  )
}
