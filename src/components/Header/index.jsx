import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { StyledLink } from '../../utils/style/Atoms'
import LightLogo from '../../assets/light-logo.png'
import DarkLogo from '../../assets/dark-logo.png'
import { useTheme } from '../../utils/hooks'
import { useLocation } from 'react-router-dom'

const HomeLogo = styled.img`
  height: 70px;
  @media (max-width: 768px) {
    height: 40px;
    margin-top: 5px;
  }
`

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    padding: 10px;
  }
`

function Header() {
  const { theme } = useTheme()

  let location = useLocation()

  return (
    <NavContainer>
      <Link to="/">
        <HomeLogo src={theme === 'light' ? DarkLogo : LightLogo} />
      </Link>
      <div>
        <StyledLink
          $theme={theme}
          to="/"
          style={
            location.pathname === '/' ? { textDecoration: 'underline' } : null
          }
        >
          Accueil
        </StyledLink>
        <StyledLink
          $theme={theme}
          to="/freelances"
          style={
            location.pathname === '/freelances'
              ? { textDecoration: 'underline' }
              : null
          }
        >
          Profils
        </StyledLink>
        <StyledLink
          to="/survey/1"
          $isFullLink
          style={
            location.pathname.includes('/survey/')
              ? { textDecoration: 'underline' }
              : null
          }
        >
          Faire le test
        </StyledLink>
      </div>
    </NavContainer>
  )
}

export default Header
