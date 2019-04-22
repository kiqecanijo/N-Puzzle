import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  padding: 0px;
  text-align:center;
  max-width: 800px;
  margin:auto
`

const Intro = props => {
  return (
    <Div>
      <img src={'./static/banderines.png'}/>
      <img src={'./static/descubre.png'}/>
      <br/>
      {props.children}
    </Div>
  )
}

export default Intro

// https://s27883.gridserver.com/.tools/phpMyAdmin/current/index.php?db=db27883_mazda&table=jaguarete_users&target=sql.php&token=124a91e774638c637fcc7d46b49c9ed5
