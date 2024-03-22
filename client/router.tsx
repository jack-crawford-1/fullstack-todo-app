/* eslint-disable react/jsx-key */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from './components/App'
import TodosPage from './components/TodosPage'
import Home from './components/Home'
import TodoForm from './components/TodoForm'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="/todoform" element={<TodoForm />} />
      </Route>
    </>,
  ),
)

export default router
