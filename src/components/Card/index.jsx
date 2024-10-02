import PropTypes from 'prop-types'
import { Component } from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import DefaultPicture from '../../assets/profile.png'

const CardLabel = styled.span`
  color: ${({ theme }) => (theme === 'light' ? colors.primary : '#ffffff')};
  font-size: 26px;
  font-weight: normal;
  text-align: center;
`

const CardTitle = styled.div`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  align-self: center;
  height: 25px;
  display: flex;
  align-items: center;
  margin-top: -25px;
  @media (max-width: 768px) {
    margin-top: 0;
  }
`

const CardImage = styled.img`
  height: 150px;
  width: 150px;
  align-self: center;
  border-radius: 50%;
  @media (max-width: 768px) {
    height: 120px;
    width: 120px;
  }
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  border-radius: 30px;
  width: 300px;
  height: 300px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: 250px;
    height: 230px;
  }
`

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { theme, picture, label, title } = this.props

    return (
      <CardWrapper theme={theme} onClick={this.setFavorite}>
        <CardLabel theme={theme}>{label}</CardLabel>
        <CardImage src={picture} alt="freelance" />
        <CardTitle theme={theme}>{title}</CardTitle>
      </CardWrapper>
    )
  }
}

Card.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
}

Card.defaultProps = {
  label: '',
  title: '',
  picture: DefaultPicture,
  theme: 'light',
}

export default Card
