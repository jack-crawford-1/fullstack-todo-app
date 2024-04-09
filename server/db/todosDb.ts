import connection from './connection.ts'
import { Todo } from '../../models/todoModel.ts'
const db = connection

export async function getAllTodos(userId: string): Promise<Todo[]> {
  return db('todos').where('user_id', userId).select()
}

export function deleteTodoById(id: number) {
  return db('todos').where('id', id).delete()
}

export function updateTodoById(id: number, newTask: string) {
  return db('todos').where('id', id).update({ task: newTask })
}

export function createTodo(todo) {
  return db('todos').insert(todo).returning('*')
}
