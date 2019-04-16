import React, { useState } from 'react'
import styled from 'styled-components'

const Div = styled.div`
  height: 200px;
  width: 200px;
  display: inline-block
`
const P = styled.p`
  font-size:30px;
  color: red
`

const Image = styled.img`
object-fit: cover;
width: 200px;
height:200px
`

const Box = ({ lastItem, number, handleClick }) => {
  return (
    <Div>
      <P
        onClick={el => handleClick(number)}
      >{number != 9 ? number : 'X' }</P>
      {/*
        <Image
          onClick={el => handleClick(number)}
          src={number != lastItem ? `https://picsum.photos/200/200?image=${number}` : 'https://picsum.photos/g/200/300'}
        />
      */}
    </Div>
  )
}

export default Box
