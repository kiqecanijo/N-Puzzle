import React from 'react'
import styled from 'styled-components'

const secondsToMinutes = seconds => Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2)

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
  text-align:center;
  max-width: 500px;
  `
  const Img = styled.img`
  width: 30%;
  margin: 0px 10px;
  `

  return (
    <Div>
      <Img src={'./static/descubre.png'} />
      <Info>Movimientos: <Box>{moves}</Box></Info>
      <Info>Tiempo: <Box>{secondsToMinutes(time)} Segundos </Box></Info>
    </Div>
  )
}
export default ScoreArea
