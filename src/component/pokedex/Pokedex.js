import React from 'react'
import { getPokemonByNumber } from '../../lib/api'

class Pokedex extends React.Component {
  state = {
    number: 1,
    name: 'test',
    sprite: 'https://cdn.traction.one/pokedex/pokemon/5.png',
    description: 'default',
    types: ['fire', 'water'],
    value: '',
    value2: 0,
    trueValue: '',
  }

  async componentDidMount() {
    const response = await getPokemonByNumber()
    console.log(response)
  }

  handleChange = (event) => {
    const letter = event.target.value
    this.setState({
      value: letter,
      trueValue: letter,
    })
  }
  handleChange2 = (event) => {
    const number = event.target.value
    this.setState({
      value2: number,
      trueValue: number,
    })
  }

  handleSubmit = (event) => {
    console.log(this.state.trueValue)
    this.setState({
      value: '',
      value2: 0,
    })
    event.preventDefault()
  }

  render() {
    if (!this.state) return null
    const { number, name, sprite, description, types, value, value2 } = this.state
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
            <form onSubmit={this.handleSubmit}>
              <input type='text' value={value} onChange={this.handleChange} />
              <input type='number' value={value2} onChange={this.handleChange2} />
              <input type='submit' value='submit' />
            </form>
          </div>
        </section>
      </>
    )
  }
}

export default Pokedex