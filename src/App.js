import React, { Component } from 'react'
import Box from './Box'
import styled from 'styled-components'
import { asideInMatrix, size, randomizer, dificult, entrypoint } from './Utils.js'
import FacebookLogin from 'react-facebook-login'
import Home from './Home'

const Board = styled.div`
    width:${size * 200}px;
    display:block;
    margin:auto;
`
const Info = styled.div`
  font-size: 20px;
  color: tomato;
  font-weight: bold;
`

const encode = data => {
  return btoa(JSON.stringify(data))
}
const cleanText = text => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

class Game extends Component {
  constructor (props) {
    const temporal = [...Array(size ** 2 + 1).keys()].splice(1)
    const tiles = randomizer(dificult, temporal)

    super(props)
    this.state = {
      tiles,
      counting: false,
      time: 0,
      solved: false,
      moves: 0,
      user: false
    }
  }

  handleClick (handleNumber) {
    // counter
    !this.state.counting && setInterval(el => this.setState(prevState => ({ time: !this.state.solved ? prevState.time + 1 : prevState.time })), 1000)
    !this.state.counting && this.setState({ counting: true })
    !this.state.solved && this.setState(({ moves }) => ({ moves: moves += 1 }))

    const tiles = !this.state.solved ? asideInMatrix(this.state.tiles, handleNumber) : this.state.tiles
    this.setState({ tiles })
  }

  componentDidUpdate () {
    console.log(this.state.user)
    const sampleTiles = [...this.state.tiles]
      .sort((a, b) => a >= b ? 1 : -1)
    // compare two arrays
    const completed = !this.state.solved &&
    sampleTiles.every((el, index) => el === this.state.tiles[index])
    completed && this.setState({ solved: true })
    completed && alert('solved')
  }

  responseFacebook (res) {
    res.id && fetch(entrypoint, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=ISO-8859-1'
      },
      body: encode({
        action: 'login',
        user_id: res.id,
        name: cleanText(res.name)
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ user: res })
      })
  }

  render () {
    return (
      <div className="App">
        {!this.state.user.user_id &&
          <Home>
            <FacebookLogin
              appId="262814888001740"
              autoLoad={false}
              fields="name,email,picture"
              callback={this.responseFacebook.bind(this)} />
          </Home>}

        {this.state.user.user_id &&
          <Board>
            <Info>Moves: {this.state.moves}</Info>
            <Info>Time: {this.state.time} seconds</Info>
            {this.state.tiles.map(number => <Box handleClick={this.handleClick.bind(this)} number={number} />)}
          </Board>}

        {this.state.user.user_id &&
        <Board>
          <Info>Moves: {this.state.moves}</Info>
          <Info>Time: {this.state.time} seconds</Info>
          {this.state.tiles.map(number => <Box handleClick={this.handleClick.bind(this)} number={number} />)}
        </Board>}
      </div>
    )
  }
}

export default Game
