import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
 max-width: 800px;
 text-align:center;
 margin:auto;
`
const You = styled.div`
display:flex;
font-size: 30px;
font-weight: 800;
text-align:center;

`
const Thanks = styled.h1`
font-size: 50px;
font-weight: 900;
text-align:center
`
const YouScore = styled.h1`
font-size: 30px;
font-weight: 900;
text-align:left;
color:#d49a18;
`

const Td = styled.td`
  text-align:center;
  font-size:24px;
  width: 200px;
`
const Th = styled(Td)

const Img = styled.img`
  width: 60px;
`
const Mid = styled.div`
  width: ${/* window.innerWidth < 600 ? 100 : 50 */50}%;
  display: block;
  text-align:center;
  position:relative
`

const Top = props => {
  return (
    <Div>
      <img src={'./static/banderines.png'}/>
      <You>
        <Mid>
          <img src={'./static/jaguarete.png'}/>
        </Mid>
        <Mid>
          <Thanks>
        ¡Gracias por jugar!
            <YouScore>
            Tus<br/>movimientos: {props.user.mistakes}
              <br/>
            Tu<br/>tiempo : {props.user.start_time}
              <br/>
            Tu<br/>actual posición : {props.top.filter(el => el.mistakes > 0 && el.start_time > 0).map(el => el.name).indexOf(props.user.name) + 1}
            </YouScore>
          </Thanks>
        </Mid>

      </You>

      <Thanks>¡Las puntuaciones más altas!</Thanks>
      <table>
        <tbody>
          <tr>
            <th>posición </th>
            <th> </th>
            <th>Nombre </th>
            <th > Movimientos </th>
            <th > Tiempo </th>
          </tr>
          {props.top.filter(el => el.mistakes > 0 && el.start_time > 0).map((user, index) =>
            <tr>
              <Td style={{ color: index == 0 && 'gold' || index == 1 && 'silver' || index == 2 && 'orange' }} > {index + 1 }</Td>
              <Td colspan="2"> <Img src={user.photo}/></Td>
              <Td colspan="2">{user.name}</Td>
              <Td >{user.mistakes}</Td>
              <Td >{user.start_time}</Td>
            </tr>
          )}
        </tbody>
      </table>
    </Div>
  )
}

export default Top
