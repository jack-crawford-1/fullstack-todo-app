import { IfAuthenticated, IfNotAuthenticated } from './Auth.tsx'
import { NavGroup, NavButton } from '../components/styling.tsx'
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
      <NavGroup>
        <IfAuthenticated>
          <NavButton className="sign-button signOut" onClick={handleSignOut}>
            Sign out
          </NavButton>
          {user && <p>Signed in as: {user?.given_name}</p>}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <NavButton className="sign-button signIn" onClick={handleSignIn}>
            Sign in
          </NavButton>
        </IfNotAuthenticated>
      </NavGroup>
    </>
  )
}

export default Nav
