import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  padding: 0px;
  text-align:center;
  max-width: 800px;
  margin:auto
`

const Intro = props => {
  return (
    <Div>

      <Div>
        <p>
          Sé una de las tres primeras personas en descubrir
          todos los pares en el menor tiempo posible y con la
          menor cantidad de errores.
          ¿Estás listo para el reto?
        </p>

      </Div>
      <br/>
      {props.children}
    </Div>
  )
}

export default Intro
