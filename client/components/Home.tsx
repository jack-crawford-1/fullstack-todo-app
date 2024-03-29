import { Link } from 'react-router-dom'
// import Login from './login/LoginForm'

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <h1> Fullstack Todo App</h1>
        <h2>Technologies Used</h2>

        <ul className="tech-stack">
          <li>Express</li>
          <li>React</li>
          <li>Knex</li>
          <li>SQLite</li>
          <li>Auth0</li>
          <li>Typescript</li>
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
