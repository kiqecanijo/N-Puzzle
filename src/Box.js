import React, { useState } from 'react'
import styled from 'styled-components'
import { size } from './Utils'

const Box = ({ number, handleClick, index }) => {
  const Img = styled.img`
    height: 196px;
    width: 196px;
    margin: 1px 2px;
    display: inline-flex;
    align-items: center;
    opacity: ${index === number ? 1 : 0.6};
    background-color: black;
  `

  const P = styled.p`
  font-size: 50px;
  height: 50px;
  margin:auto;
  color:
  `

  const Div = styled.div`
  background-color: #fff;
    height: 196px;
    width: 196px;
    margin: 1px 2px;
    display: inline-flex;
    align-items: center;
    background-size: contain;
    font-size: 30px;
    text-align:center;
    opacity: ${index === number || number === size ** 2 ? 1 : 0.6};
    background-image: url('./numbers/${number}.png');
    background-blend-mode: ${number == size ** 2 && 'exclusion' || 'unset'};

  `
  // <Img onClick={event => handleClick(number)} src={`./numbers/${number}.png`} />
  return (
    <Div onClick={event => handleClick(number)}>
      <P>{index !== number && number !== size ** 2 && number }</P>
    </Div>
  )
}

export default Box
