import React, { Component } from 'react'
import './App.css'
import Box from './Box'
import styled from 'styled-components'
import { asideInMatrix, size } from './Utils.js'

const Board = styled.div`
    width:${size * 200}px;
    display:block;
    margin:auto
`

class Game extends Component {
  constructor (props) {
    const tiles = [...Array(size ** 2).keys()].sort((a, b) => 0.5 - Math.random())
    super(props)
    this.state = {
      tiles
    }
  }

  handleClick (handleNumber) {
    const tiles = asideInMatrix(this.state.tiles, handleNumber)

    this.setState(prevState => ({ ...prevState, tiles: tiles }))
  }

  render () {
    return (
      <div className="App">
        <Board>
          {this.state.tiles.map(number => <Box handleClick={this.handleClick.bind(this)} number={number} url={number ? `https://picsum.photos/200/200?image=${number}` : 'https://picsum.photos/g/200/300'}/>)}
        </Board>
      </div>
    )
  }
}

export default Game
