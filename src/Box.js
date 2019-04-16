import React, { useState } from 'react'
import styled from 'styled-components'
import { size } from './Utils'

const Box = ({ number, handleClick }) => {
  const Div = styled.div`
    height: 196px;
    width: 196px;
    display: inline-flex;
    align-items: center;
    background-color: ${number !== size ** 2 ? 'tomato' : 'black'} ;
    margin:2px;
  `
  const P = styled.p`
    margin:auto;
    font-size: 40px;
    color:white;
    font-weight: bold;
  `

  return (
    <Div onClick={el => handleClick(number)}>
      <P>
        {number}
      </P>
    </Div>
  )
}

export default Box
