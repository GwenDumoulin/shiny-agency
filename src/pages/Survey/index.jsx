import { useContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { SurveyContext } from '../../utils/context'
import { useTheme } from '../../utils/hooks'
import dataSurvey from '../../data/survey.json'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 380px);
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const QuestionContent = styled.span`
  margin: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  @media (max-width: 768px) {
    text-align: center;
    margin: 20px;
  }
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d3d3d3;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
  @media (max-width: 768px) {
    height: 60px;
    width: 150px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

function Survey() {
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  const { theme } = useTheme()

  const { saveAnswers, answers } = useContext(SurveyContext)
  const inputRef = useRef(null)
  const inputRefResult = useRef(null)

  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer })
    if (surveyData && surveyData[questionNumberInt + 1]) {
      setTimeout(() => {
        inputRef.current.click()
      }, '300')
    }
    if (surveyData && !surveyData[questionNumberInt + 1]) {
      setTimeout(() => {
        inputRefResult.current.click()
      }, '1200')
    }
  }
  const surveyData = dataSurvey

  return (
    <SurveyContainer>
      <QuestionTitle theme={theme}>Question {questionNumber}</QuestionTitle>
      <QuestionContent theme={theme} data-testid="question-content">
        {surveyData && surveyData[questionNumber]}
      </QuestionContent>
      <ReplyWrapper>
        <ReplyBox
          onClick={() => saveReply(true)}
          isSelected={answers[questionNumber] === true}
          theme={theme}
        >
          Oui
        </ReplyBox>
        <ReplyBox
          onClick={() => saveReply(false)}
          isSelected={answers[questionNumber] === false}
          theme={theme}
        >
          Non
        </ReplyBox>
      </ReplyWrapper>
      <LinkWrapper theme={theme}>
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {surveyData && surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`} ref={inputRef}>
            Suivant
          </Link>
        ) : (
          <Link to="/results" ref={inputRefResult}>
            Résultats
          </Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}

export default Survey
