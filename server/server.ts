import express from 'express'
import * as Path from 'node:path'

import todoRoutes from './routes/todos.ts'

const server = express()

server.use(express.json())

server.use('/api/v1', todoRoutes)

//  2 - add server routes above once they are created
// Set up API endpoints (server.ts): With your data model ready, you can now expose it via API endpoints.

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
