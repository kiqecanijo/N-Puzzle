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

    // const tiles = [...Array(size ** 2 + 1).keys()].splice(1).sort((a, b) => 0.5 - Math.random())
    const tiles = randomizer(20, temporal)

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

    console.log(this.state.tiles)
    console.log(sampleTiles)

    sampleTiles === this.state.tiles && alert('resuelto!!')
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
