import { Login } from '../../models/loginModel.ts'
import connection from './connection.ts'
const db = connection

export async function findUserByUsername(username: string): Promise<Login> {
  return await db('credentials').where({ username: username }).first()
}
