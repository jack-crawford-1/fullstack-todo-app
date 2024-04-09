import { IfAuthenticated, IfNotAuthenticated } from './Auth.tsx'
import { NavGroup, NavButton } from '../components/Styling.tsx'
import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  const { user, logout, loginWithRedirect } = useAuth0()

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect()
  }

  return (
    <>
      <div className="sign-in-container">
        <NavGroup>
          <IfNotAuthenticated>
            <NavButton className="sign-button signIn" onClick={handleSignIn}>
              Sign in
            </NavButton>
          </IfNotAuthenticated>
          <IfAuthenticated>
            <div className="user-info">
              {user && (
                <>
                  <img className="user-image" src={user?.picture} alt="User" />
                  <p>Signed in as: {user?.given_name}</p>
                </>
              )}
            </div>
            <NavButton className="sign-button signOut" onClick={handleSignOut}>
              Sign out
            </NavButton>
          </IfAuthenticated>
        </NavGroup>
      </div>
    </>
  )
}

export default Nav
