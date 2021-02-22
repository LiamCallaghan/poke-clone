import React from 'react'

class Pokedex extends React.Component {
  state = {

  }

  render() {
    if (!this.state) return null
    return (
      <div><p>Hello world.</p></div>
    )
  }
}

export default Pokedex