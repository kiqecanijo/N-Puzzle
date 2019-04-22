import React, { useState } from 'react'
import styled from 'styled-components'

const Rules = props => {
  const [readed, switchReaded] = useState(false)

  const Button = styled.button`
  border: 0px solid;
  font-size: 20px;
  padding: 10px;
  text-align:center;
  width: 200px;
  margin:auto;
  background-color:#fecd72;
  color: #003453;
  font-weight: bold;
  cursor:pointer;
  `

  const Rules = styled.div`
  font-weight: 600;
  font-size:20px;
    height: 120%;
    width: 100%;
    background-color: #00000070;
    position: absolute;
    left: 0px;
    top: 0px;
    margin: 0px;
  `

  const Div = styled.div`
    height: 50%;
    width: 40%;
    position: relative;
    left: 0px;
    top: 0px;
    margin: auto;
    color:white;
    text-align:center;
    padding:40px;
  `

  return (
    !readed &&
    <Rules>
      <Div>
        <b><h5>Instrucciones</h5></b>
        <ol>
          <li>
          Para jugar debes dar clic en el siguiente enlace:
    URL al juego
          </li>
          <li>
          Inicia sesión con Facebook para poder jugar.
          </li>
          <li>
          Desliza cada celda para armar la imagen de Jaguarete.
          </li>
          <li>
          Ganarán las 3 primeras personas en descubrir la imagen de
          Jaguarete en el menor tiempo posible. (En caso de empate, se tomará
          en cuenta el número de movimientos ejecutados)
          </li>
          <li>
          Tienes a partir de este momento y hasta el lunes 29 de abril a las
          </li>
        </ol>

          Conoce más de la dinámica dando clic aquí:<br/>
          URL a Términos y Condiciones.
        <br/>
        <br/>
        <Button
          onClick={el => switchReaded(true)}
        >
        ¡A jugar!
        </Button>
      </Div>
    </Rules> || null
  )
}

export default Rules
