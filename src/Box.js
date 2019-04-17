import React, { useState } from 'react'
import styled from 'styled-components'
import { size } from './Utils'

const Box = ({ number, handleClick }) => {
  const Img = styled.img`
    height: 196px;
    width: 196px;
    margin: 1px 2px;
    display: inline-flex;
    align-items: center;
  `

  return <Img onClick={event => handleClick(number)} src={`./numbers/${number}.png`} />
}

export default Box
