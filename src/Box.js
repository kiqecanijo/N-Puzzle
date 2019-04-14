import React, { useState } from 'react'
import styled from 'styled-components'

const Div = styled.div`
  height: 200px;
  width: 200px;
  display: inline-block
`
const Image = styled.img`
object-fit: cover;
width: 200px;
height:200px
`

const Box = ({ url, number, handleClick }) => {
  return (
    <Div>
      <Image src={url} onClick={el => handleClick(number)} />
    </Div>
  )
}

export default Box
