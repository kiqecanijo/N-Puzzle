import React, { Component } from 'react'
import Box from './Box'
import styled from 'styled-components'
import { asideInMatrix, size, randomizer, dificult, entrypoint } from './Utils.js'
import FacebookLogin from 'react-facebook-login'
import Intro from './Intro'

const Form = styled.form`
  margin:auto;
  text-align:center;

`

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
const inputStyles = {
  padding: '15px',
  width: '300px',
  maxWidth: '80%',
  border: '0px',
  borderRadius: '5px',
  fontSize: '13px',
  margin: '5px'
}

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

    console.log(handleNumber)
    !this.state.counting && setInterval(el => this.setState(prevState => ({ time: !this.state.solved ? prevState.time + 1 : prevState.time })), 1000)
    !this.state.counting && this.setState({ counting: true })

    const tiles = !this.state.solved ? asideInMatrix(this.state.tiles, handleNumber) : this.state.tiles

    handleNumber !== size ** 2 &&
     tiles !== asideInMatrix(this.state.tiles, handleNumber) &&
     !this.state.solved && this.setState(({ moves }) => ({ moves: moves += 1 }))

    this.setState({ tiles })
  }

  componentDidUpdate () {
    const sampleTiles = [...this.state.tiles]
      .sort((a, b) => a >= b ? 1 : -1)
    // compare two arrays
    const completed = !this.state.solved &&
    sampleTiles.every((el, index) => el === this.state.tiles[index])
    completed && this.setState({ solved: true })
    completed && fetch(entrypoint, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=ISO-8859-1'
      },
      body: encode({
        user_id: this.state.user.user_id,
        action: 'endGame',
        mistakes: this.state.moves,
        startTime: this.state.time,
        cards: JSON.stringify(this.state.tiles)
      })
    })
      .then(res => res.json())
      .then(response => {
        this.setState({ user: response })
      })
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
        name: cleanText(res.name),
        photo: res.picture.data.url
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ user: res })
      })
  }

  sumbitForm (form) {
    form.preventDefault()

    fetch(entrypoint, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=ISO-8859-1'
      },
      body: encode({
        user_id: this.state.user.user_id,
        action: 'complete',
        full_name: this.state.user.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, ''),
        phone: this.state.user.phone,
        email: this.state.user.email,
        full_email: this.state.user.email
      })
    })
      .then(res => res.json())
      .then(response => {
        console.log(response)
        response.user_id &&
            this.setState({
              ...this.state,
              user: response
            })
      })
  }

  render () {
    return (
      !this.state.user.score &&
      <div className="App">
        {!this.state.user.user_id &&
          <Intro>
            <FacebookLogin
              appId="262814888001740"
              autoLoad={false}
              fields="name,email,picture"
              callback={this.responseFacebook.bind(this)} />
          </Intro>
        }

        {this.state.user.user_id && !this.state.user.full_name &&
          <Form onSubmit={this.sumbitForm.bind(this)}>
            <p className={'bold'}>Regístrate</p>
            <input
              style={inputStyles}
              type="text"
              minlength={4}
              pattern="^[a-z A-Z á-ź Á-Ź]{4,100}$"
              title="inserte un nombre válido"
              placeholder="Nombre que aparece en tu  identificación oficial"
              value={this.state.user.name}
              onChange={event => {
                event.persist()
                this.setState(prevState => ({ user: { ...prevState.user, name: event.target.value } }))
              }}
            />
            <br />
            <input
              style={inputStyles}
              type="number"
              minlength={8}
              placeholder="Número de teléfono"
              pattern="^[0-9]{8,}$"
              title="inserte un número válido"
              value={this.state.user.phone}
              onChange={event => {
                event.persist()
                this.setState(prevState => ({ user: { ...prevState.user, phone: event.target.value } }))
              }}
            />
            <br />
            <input
              style={inputStyles}
              type="text"
              minlength={5}
              pattern="^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$"
              title="inserte un correo válido"
              placeholder="Correo"
              value={this.state.user.email}
              onChange={event => {
                event.persist()
                this.setState(prevState => ({ user: { ...prevState.user, email: event.target.value } }))
              }}
            />
            <br />
            <button
              disabled={
                !this.state.user.name ||
                      (this.state.user.phone !== null
                        ? this.state.user.phone.length < 8
                        : !this.state.user.phone) ||
                      !this.state.user.email
              }
            >Siguiente
            </button>
          </Form>

        }

        {this.state.user.user_id && this.state.user.full_name &&
        <Board>
          <Info>Moves: {this.state.moves}</Info>
          <Info>Time: {this.state.time} seconds</Info>
          {this.state.tiles.map(number => <Box handleClick={this.handleClick.bind(this)} number={number} />)}
        </Board>}
      </div> ||
      <div>
        <h1>{this.state.user.name}</h1><br/>
        <h1>{this.state.user.mistakes}</h1><br/>
        <h1>{this.state.user.start_time}</h1><br/>
        <img src={this.state.user.photo}/>
        {console.log(this.state.user.top)}

      </div>
    )
  }
}

export default Game
