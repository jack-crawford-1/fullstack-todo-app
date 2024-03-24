import { Link } from 'react-router-dom'
// import Login from './login/LoginForm'

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <h1> Fullstack Todo App</h1>
        <h2>Stack used</h2>

        <ul className="tech-stack">
          <li>Express</li>
          <li>React</li>
          <li>Knex</li>
          <li>SQLite</li>
        </ul>
        <div className="nav-buttons">
          <Link to="/todos" className="nav-button">
            {' '}
            <button>Todo List </button>
          </Link>
        </div>
        {/* <Login /> */}
      </div>
    </div>
  )
}
