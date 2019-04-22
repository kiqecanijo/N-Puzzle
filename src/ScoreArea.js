import React from 'react'
import styled from 'styled-components'

const ScoreArea = props => {
  const { moves, time } = props

  const Info = styled.div`
  font-size: 20px;
  color: #fecd72;
  font-weight: bold;
  display:inline-block

  `
  const Box = styled.div`
  background-color:#002337;
  color: #fecd72;
  font-weight: bold;
  padding: 8px;
  width: 130px;
  margin:5px;
  heigth: 40px;

  `
  const Div = styled.div`
  text-align:center
  `
  const Img = styled.img`
  width: 30%;
  `

  return (
    <Div>
      <Img src={'./static/descubre.png'} />
      <Info>Movimientos: <Box>{moves}</Box></Info>
      <Info>Tiempo: <Box>{time} Segundos </Box></Info>
    </Div>
  )
}
export default ScoreArea
