import { useState } from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

const InputWrapper = styled.div`
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  display: flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const StyledInput = styled.input`
  border: none;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  background-color: transparent;
  border-bottom: 1px solid
    ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  margin-top: 5px;
  margin-bottom: 15px;
  &:focus,
  &:focus-visible {
    border: none;
    outline: none;
    border-bottom: 1px solid
      ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  }
`

function EmailInput({ theme }) {
  const [inputValue, setInputValue] = useState('')

  return (
    <InputWrapper theme={theme}>
      <StyledLabel theme={theme}>
        Entrez votre email pour recevoir la Newsletter
      </StyledLabel>
      <StyledInput
        theme={theme}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {String(inputValue)}
    </InputWrapper>
  )
}

export default EmailInput
