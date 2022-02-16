import * as React from 'react'
import Game from '../Game'
import './styles.css'

class Dino extends React.Component {
  render() {
    return (
      <div className='container'>
        <div>
          <Game />
        </div>
        <div />
      </div>
    )
  }
}

export default Dino