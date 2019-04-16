import React, { Component } from 'react'
import './App.css'
import Box from './Box'
import styled from 'styled-components'
import { asideInMatrix, size, randomizer } from './Utils.js'

const Board = styled.div`
    width:${size * 200}px;
    display:block;
    margin:auto
`

class Game extends Component {
  constructor (props) {
    const temporal = [...Array(size ** 2 + 1).keys()].splice(1)
    const tiles = randomizer(1, temporal)

    super(props)
    this.state = {
      tiles
    }
  }

  handleClick (handleNumber) {
    const tiles = asideInMatrix(this.state.tiles, handleNumber)
    this.setState({ tiles })
  }

  componentDidUpdate () {
    const sampleTiles = [...this.state.tiles]
      .sort((a, b) => a >= b ? 1 : -1)

    // compare two arrays
    sampleTiles.every((el, index) => el === this.state.tiles[index]) && alert('done')
  }

  render () {
    return (
      <div className="App">
        <Board>
          {this.state.tiles.map(number => <Box lastItem={this.state.tiles.length} handleClick={this.handleClick.bind(this)} number={number} />)}
        </Board>
      </div>
    )
  }
}

export default Game
