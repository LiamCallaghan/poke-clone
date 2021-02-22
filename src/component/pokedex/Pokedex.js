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
      <>
        <section>
          <div className='side1'>
            <img src={sprite} />
          </div>
          <div className='side2'>
            <p>{number}</p>
            <p>{name}</p>
            <p>{description}</p>
            <ul>
              {types.map(type => {
                return <li key={type}>{type}</li>
              })}
            </ul>
          </div>
        </section>
      </>
    )
  }
}

export default Pokedex