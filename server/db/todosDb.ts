import connection from './connection.ts'
import { Todo } from '../../models/todoModel.ts'
const db = connection

export async function getAllTodos(): Promise<Todo[]> {
  return db('todos').select()
}

export function deleteTodoById(id: number) {
  return db('todos').where('id', id).delete()
}

export function updateTodoById(id: number, newTask: string) {
  return db('todos').where('id', id).update({ task: newTask })
}

export function createTodo(todo: Todo) {
  return db('todos').insert({ task: todo.task }).returning('*')
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function addTodo(_task: unknown) {
  throw new Error('Function not implemented.')
}

//  3
// server/db/todos.ts
// is where the db function to get the shape of the data from the interface model and return something to the database.
// Implement the database access function (server/db/todos.ts). Functions that will interact with database based on the data model.
