import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
 max-width: 800px;
 text-align:center;
 margin:auto;
`
const You = styled.div`
display:inline-flex;
font-size: 34px;
font-weight: 800;
text-align:left
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

const Top = props => {
  return (
    <Div>

      <img src={'./static/banderines.png'}/>
      <You>
        <img src={'./static/jaguarete.png'}/>
        <thanks>
        ¡Gracias por jugar!
          <YouScore>
            Tus<br/>movimientos: {props.user.mistakes}
            <br/>
            Tu<br/>tiempo : {props.user.start_time}
          </YouScore>
        </thanks>
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
          {props.top.map((user, index) =>
            <tr>
              <Td > {index + 1 }</Td>
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
