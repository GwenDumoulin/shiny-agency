import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import colors from '../../utils/style/colors'
import { useState, useRef } from 'react'
import { useTheme } from '../../utils/hooks'
import dataFreelance from '../../data/freelances.json'
import dataJob from '../../data/resultsDef.json'

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  margin: 0 60px;
  @media (max-width: 768px) {
    margin: 0 10px;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 250px 250px;
    margin-top: 20px;
  }
`

const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const FilterButton = styled.button`
  font-size: 20px;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  margin: 0 10px;
  color: #ffffff;
  font-weight: 300;
  text-align: center;
  background-color: #5843e4;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 5px 15px;
    margin: 5px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const RemonveFilters = styled.p`
  text-decoration: underline;
  text-align: center;
  margin: 15px auto;
  font-size: 14px;
  cursor: pointer;
`

function Freelances() {
  const colorsIncluded = ['#5843E4', '#ffffff']
  const colorsExcluded = ['#E4E4E4', '#000000']
  const { theme } = useTheme()
  const freelancersList = dataFreelance
  let completeDataJob = [...Object.keys(dataJob), 'Fullstack']
  const queryParameters = new URLSearchParams(window.location.search)
  const included = queryParameters.get('included')
  let starterJob = completeDataJob
  if (included) starterJob = JSON.parse(included)
  const [includedJobs, changeIncludedJobs] = useState(starterJob)

  const myRefs = useRef([])
  myRefs.current = completeDataJob.map(
    (i) => myRefs.current[i] ?? React.createRef(),
  )

  return (
    <div>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      <FilterContainer>
        {completeDataJob.map(function (job, index) {
          return (
            <FilterButton
              key={index}
              ref={myRefs.current[index]}
              style={{
                color: starterJob.includes(job)
                  ? colorsIncluded[1]
                  : colorsExcluded[1],
                backgroundColor: starterJob.includes(job)
                  ? colorsIncluded[0]
                  : colorsExcluded[0],
              }}
              onClick={() => {
                let newincludedJobs = [...includedJobs]
                includedJobs.indexOf(job) === -1
                  ? newincludedJobs.push(job)
                  : newincludedJobs.splice(includedJobs.indexOf(job), 1)
                changeIncludedJobs(newincludedJobs)

                // Style
                let myRefStyle = myRefs.current[index].current.style
                if (myRefStyle) {
                  if (myRefStyle.backgroundColor === 'rgb(88, 67, 228)') {
                    myRefs.current[index].current.style.backgroundColor =
                      colorsExcluded[0]
                    myRefs.current[index].current.style.color =
                      colorsExcluded[1]
                  } else {
                    myRefs.current[index].current.style.backgroundColor =
                      colorsIncluded[0]
                    myRefs.current[index].current.style.color =
                      colorsIncluded[1]
                  }
                }
              }}
            >
              {job}
            </FilterButton>
          )
        })}
      </FilterContainer>
      <RemonveFilters
        onClick={() => {
          for (let i = 0; i < myRefs.current.length; i++) {
            myRefs.current[i].current.style.backgroundColor = colorsExcluded[0]
            myRefs.current[i].current.style.color = colorsExcluded[1]
          }
          changeIncludedJobs([])
        }}
      >
        Enlever tous les profils
      </RemonveFilters>
      <CardsContainer>
        {freelancersList.map((profile) => {
          let shouldShow = false
          for (const job of includedJobs) {
            for (const skill of profile.skills) {
              if (skill.toLowerCase().includes(job.toLowerCase()))
                shouldShow = true
            }
            if (profile.job.toLowerCase().includes(job.toLowerCase()))
              shouldShow = true
          }
          if (shouldShow === true) {
            const imagePath = require(`../../assets/photos/${profile.picture}`)

            return (
              <Link
                key={`freelance-${profile.id}`}
                to={`/profile/${profile.id}`}
              >
                <Card
                  label={profile.job}
                  title={profile.name}
                  picture={imagePath}
                  theme={theme}
                />
              </Link>
            )
          } else {
            return null
          }
        })}
      </CardsContainer>
    </div>
  )
}

export default Freelances
