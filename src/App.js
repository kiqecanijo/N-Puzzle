import React, { Component } from 'react'
import './App.css'
import Box from './Box'
import styled from 'styled-components'
import { asideInMatrix, size, randomizer, dificult } from './Utils.js'

const Board = styled.div`
    width:${size * 200}px;
    display:block;
    margin:auto
`

class Game extends Component {
  constructor (props) {
    const temporal = [...Array(size ** 2 + 1).keys()].splice(1)
    const tiles = randomizer(dificult, temporal)

    super(props)
    this.state = {
      tiles,
      counting: false,
      time: 0,
      solved: false
    }
  }

  handleClick (handleNumber) {
    // counter
    !this.state.counting && setInterval(el => this.setState(prevState => ({ time: prevState.time + 1 })), 1000)
    !this.state.counting && this.setState({ counting: true })

    const tiles = !this.state.solved ? asideInMatrix(this.state.tiles, handleNumber) : this.state.tiles
    this.setState({ tiles })
  }

  componentDidUpdate () {
    const sampleTiles = [...this.state.tiles]
      .sort((a, b) => a >= b ? 1 : -1)
    // compare two arrays
    const completed = !this.state.solved &&
    sampleTiles.every((el, index) => el === this.state.tiles[index])

    completed && this.setState({ solved: true })
    completed && alert('done')
  }

  render () {
    return (
      <div className="App">
        <Board>
          {this.state.tiles.map(number => <Box lastItem={this.state.tiles.length} handleClick={this.handleClick.bind(this)} number={number} />)}
        </Board>

        <button >start counting</button>
        Time: {this.state.time}
      </div>
    )
  }
}

export default Game
