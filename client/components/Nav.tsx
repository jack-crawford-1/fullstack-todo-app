import { IfAuthenticated, IfNotAuthenticated } from './Auth.tsx'

import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  const { user, logout, loginWithRedirect } = useAuth0()

  return (
    <div className="sign-in-container">
      <h1>Fullstack Todo App</h1>
      <div className="user-info">
        <IfNotAuthenticated>
          <button
            className="sign-button signIn"
            onClick={() => loginWithRedirect()}
          >
            Sign in
          </button>
        </IfNotAuthenticated>
        <IfAuthenticated>
          {user && (
            <>
              <img className="user-image" src={user.picture} alt="User" />
              <button className="sign-button signOut" onClick={() => logout()}>
                Sign out
              </button>
            </>
          )}
        </IfAuthenticated>
      </div>
    </div>
  )
}

export default Nav
