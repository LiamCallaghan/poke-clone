import React from 'react'

class Pokedex extends React.Component {
  state = {
    number: 1,
    name: 'test',
    sprite: 'https://cdn.traction.one/pokedex/pokemon/5.png',
    description: 'default',
    types: ['fire', 'water'],
  }

  render() {
    if (!this.state) return null
    const { number, name, sprite, description, types } = this.state
    return (
      <div>
        <p>{number}</p>
        <p>{name}</p>
        <img src={sprite} />
        <p>{description}</p>
        <ul>
          {types.map(type => {
            return <li key={type}>{type}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default Pokedex