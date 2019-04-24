import React, { Component } from 'react'
import Box from './Box'
import styled from 'styled-components'
import { asideInMatrix, size, randomizer, dificult, entrypoint } from './Utils.js'
import FacebookLogin from 'react-facebook-login'
import Intro from './Intro'
import ScoreArea from './ScoreArea'
import Rules from './Rules'
import Top from './Top'

const Form = styled.form`
margin:auto;
text-align:center;
`

const Checkbox = styled.input`
width:20px;
height: 20px;
vertical-align:middle;
border:0px;

`

const Button = styled.button`
${props => props.disabled && `
     background-color: gray;
  ` || `
  background-color: #fecd72;
  `}
border: 0px solid;
font-size: 20px;
padding: 10px;
text-align:center;
width: 200px;
margin:auto;
color: #003453;
font-weight: bold;
cursor:pointer;
`

const Div = styled.div`
padding: 0px;
text-align:center;
max-width: 800px;
margin:auto
`

const Board = styled.div`
width:${size * 160}px;
display:block;
margin:auto;
`
const Places = styled.div`
  display:inline-block;
  position: relative;
  text-align:center;
  width:30%;
  vertical-align:top;
  font-size:20px;
  font-weight: 600;
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
      user: false,
      checked: false
    }
  }

  handleClick (handleNumber) {
    // counter
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
        photo: res.picture.data.url,
        email: res.email
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
          <Div>
            <p>
        Sé una de las tres primeras personas en descubrir
        todos los pares en el menor tiempo posible y con la
        menor cantidad de errores.<br/><br/>
              <b>¿Estás listo para el reto?</b>
            </p>
            <Places>
              <p className={'gold'}>Primer lugar:</p>
            </Places>
            <Places>
              <p className={'gold'}>Segundo lugar:</p>
            </Places><Places>
              <p className={'gold'}>Tercer lugar:</p>
            </Places>
            <Places>
              <p>Set de arte, monedero
              electrónico con $300 en
              una prestigada tienda
              de autoservicio y
              NutriBaby 3®
              Stick Pack</p>
            </Places>
            <Places>

              <p>Juguete didáctico y
              NutriBaby 3®
              Stick Pack</p>
            </Places>
            <Places>

              <p>Balón de futbol y
              NutriBaby 3®
               Stick Pack </p>
            </Places>

          </Div>
          <FacebookLogin
            appId="262814888001740"
            autoLoad={false}
            textButton={'Ingresa con facebook'}
            fields="name,email,picture"
            isMobile={false}
            callback={this.responseFacebook.bind(this)} />
        </Intro>
        }
        {this.state.user.user_id && !this.state.user.full_name &&
        <Intro>
          <Form onSubmit={this.sumbitForm.bind(this)}>
            <p
              className={'bold'}>Regístrate</p>
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
            {!this.state.user.name && 'ingrese un nombre válido'}
            <br/>
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
            <br/>
            {this.state.user.phone !== null && this.state.user.phone.length < 8 && 'Introduce un teléfono válido'}
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
            {!this.state.user.email && 'ingrese un email válido'}
            <br />
            <Checkbox type="checkbox" checked={this.state.checked} onChange={ event => this.setState(prevState => ({ checked: true })) }/>
           *Aceptas los <a target="_blank" href="https://www.facebook.com/NutriBabyMexico/app/171841683292560/" className="gold">términos de privacidad</a>
            <br/>
            <br/>

            <Button
              disabled={
                !this.state.user.name ||
         (this.state.user.phone !== null
           ? this.state.user.phone.length < 8
           : !this.state.user.phone) ||
           !this.state.user.email ||
           !this.state.checked
              }
            >Siguiente
            </Button>

          </Form>
        </Intro>
        }
        {this.state.user.user_id && this.state.user.full_name &&
          <Board>
            <Rules/>
            <ScoreArea moves={this.state.moves} time={this.state.time} />
            {this.state.tiles.map((number, index) => <Box handleClick={this.handleClick.bind(this)} number={number} index={index + 1} />)}
          </Board>
        }
      </div> ||
        <Top user={this.state.user} top={this.state.user.top} />

    )
  }
}

export default Game
