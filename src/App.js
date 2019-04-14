import React, { Component } from 'react'
import './App.css'
import Box from './Box'
import styled from 'styled-components'
import { asideInMatrix, size } from './Utils.js'

const Board = styled.div`
    width:600px;
    display:block;
    margin:auto
`

const tiles = [...Array(size ** 2).keys()]

class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      handle: null
    }
  }

  handleClick (number) {
    asideInMatrix(number)
  }

  render () {
    return (
      <div className="App">
        <Board>
          {tiles.map(number => <Box handleClick={this.handleClick} number={number} url={number ? `https://picsum.photos/200/200?image=${number}` : 'https://picsum.photos/g/200/300'}/>)}
        </Board>
      </div>
    )
  }
}

export default Game
