import { useContext } from 'react'
import styled from 'styled-components'
import EmptyList from '../../components/EmptyList'
import { SurveyContext } from '../../utils/context'
import colors from '../../utils/style/colors'
import { useTheme } from '../../utils/hooks'
import { StyledLink } from '../../utils/style/Atoms'
import dataResults from '../../data/results.json'
import dataResultsDef from '../../data/resultsDef.json'

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 90px;
  padding: 30px;
  min-height: calc(100vh - 520px);
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  @media (max-width: 768px) {
    margin: 10px;
    padding: 10px;
  }
`

const ResultsTitle = styled.h2`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-weight: bold;
  font-size: 28px;
  max-width: 700px;
  text-align: center;
  & > span {
    padding-left: 10px;
  }
  @media (max-width: 768px) {
    max-width: 100vw;
    font-size: 18px;
  }
`

const DescriptionWrapper = styled.div`
  padding: 60px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`

const JobTitle = styled.span`
  color: ${({ theme }) =>
    theme === 'light' ? colors.primary : colors.backgroundLight};
  text-transform: capitalize;
`

const JobDescription = styled.div`
  font-size: 18px;
  & > p {
    color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
    margin-block-start: 5px;
  }
  & > span {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
    & > span {
      font-size: 18px;
    }
  }
`

const TitleWithoutJobs = styled.p`
  margin-bottom: 5px;
`

export function formatJobList(title, listLength, index) {
  if (index === listLength - 1) {
    return title
  } else {
    return `${title},`
  }
}

function getResults(a1, a2, a3, a4, a5, a6) {
  const answers = { a1, a2, a3, a4, a5, a6 }
  const answerNumbers = Object.keys(answers)

  const jobsList = Object.keys(dataResults)

  const requiredJobsList = answerNumbers.reduce((prevJobs, answerNumber) => {
    if (!answers[answerNumber] || answers[answerNumber] === 'false') {
      return prevJobs
    }

    const jobs = jobsList.reduce((prevJobAnswers, jobTitle) => {
      if (dataResults[jobTitle].includes(answerNumber)) {
        return [...prevJobAnswers, jobTitle]
      }
      return prevJobAnswers
    }, [])

    return [...prevJobs, ...jobs]
  }, [])

  const uniqueJobs = [...new Set(requiredJobsList)]
  return uniqueJobs.map((job) => ({
    title: job,
    description: dataResultsDef[job],
  }))
}

function Results() {
  const { theme } = useTheme()
  const { answers } = useContext(SurveyContext)
  const resultsData = getResults(
    answers[1],
    answers[2],
    answers[3],
    answers[4],
    answers[5],
    answers[6],
  )

  if (resultsData?.length < 1) {
    return <EmptyList theme={theme} />
  }

  let jobsIncluded = resultsData.map((a) => a.title)
  if (jobsIncluded.includes('Frontend') && jobsIncluded.includes('Backend'))
    jobsIncluded.push('Fullstack')

  return (
    <ResultsContainer theme={theme}>
      <ResultsTitle theme={theme}>
        <TitleWithoutJobs>
          Les compétences dont vous&nbsp;avez&nbsp;besoin&nbsp;:
        </TitleWithoutJobs>
        {resultsData &&
          resultsData.map((result, index) => (
            <JobTitle
              key={`result-title-${index}-${result.title}`}
              theme={theme}
            >
              {formatJobList(result.title, resultsData.length, index)}
            </JobTitle>
          ))}
      </ResultsTitle>
      <StyledLink
        $isFullLink
        to={`/freelances?included=${encodeURIComponent(JSON.stringify(jobsIncluded))}`}
      >
        Découvrez nos profils
      </StyledLink>
      <DescriptionWrapper>
        {resultsData &&
          resultsData.map((result, index) => (
            <JobDescription
              theme={theme}
              key={`result-detail-${index}-${result.title}`}
            >
              <JobTitle theme={theme} data-testid="job-title">
                {result.title}
              </JobTitle>
              <p data-testid="job-description">{result.description}</p>
            </JobDescription>
          ))}
      </DescriptionWrapper>
    </ResultsContainer>
  )
}

export default Results
