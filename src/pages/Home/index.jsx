import { useEffect } from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { StyledLink } from '../../utils/style/Atoms'
import { useTheme } from '../../utils/hooks'
import HomeIllustration from '../../assets/home-illustration.svg'

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 380px);
  @media (max-width: 768px) {
    min-height: 0;
  }
`

const HomerContainer = styled.div`
  margin: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  padding: 60px 90px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vw;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin: 10px;
  }
`

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 300px;
  ${StyledLink} {
    max-width: 250px;
  }
  @media (max-width: 768px) {
    align-items: center;
    ${StyledLink} {
      min-width: 180px;
      padding: 10px;
    }
  }
`

const StyledTitle = styled.h2`
  padding-bottom: 30px;
  max-width: 320px;
  line-height: 55px;
  font-size: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  @media (max-width: 768px) {
    text-align: center;
    line-height: 40px;
    font-size: 25px;
  }
`

const Illustration = styled.img`
  flex: 1;
  max-width: 50vw;
  @media (max-width: 768px) {
    width: 80%;
    max-width: 80%;
  }
`

function Home() {
  const { theme } = useTheme()
  useEffect(() => {
    document.title = 'Shiny Agency'
  }, [])

  return (
    <HomeWrapper>
      <HomerContainer theme={theme}>
        <LeftCol>
          <StyledTitle theme={theme}>
            Repérez vos besoins, on s’occupe du reste, avec les meilleurs
            talents
          </StyledTitle>
          <StyledLink to="/survey/1" $isFullLink>
            Faire le test
          </StyledLink>
        </LeftCol>
        <Illustration src={HomeIllustration} />
      </HomerContainer>
    </HomeWrapper>
  )
}

export default Home
