import connection from './connection.ts'
import { Todo } from '../../models/todo.ts'
const db = connection

export async function getAllTodos(): Promise<Todo[]> {
  return db('todos').select()
}

export function deleteTodo(id: number) {
  return db('todos').where('id', id).delete()
}
//  3
// server/db/todos.ts
// is where the db function to get the shape of the data from the interface model and return something to the database.
// Implement the database access function (server/db/todos.ts). Functions that will interact with database based on the data model.
