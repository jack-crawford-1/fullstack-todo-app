import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <h1> Backend API with React</h1>
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
          <Link to="/todoform" className="nav-button">
            {' '}
            <button>Todo Form </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
