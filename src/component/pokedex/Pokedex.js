import React from 'react'
import Select from 'react-select'
import { getPokemonByNumber } from '../../lib/api'

class Pokedex extends React.Component {
  state = {
    number: 1,
    name: 'test',
    sprite: 'https://cdn.traction.one/pokedex/pokemon/5.png',
    description: 'default',
    evolutionLine: [ 'Squirtle', 'Froakie', 'Charmeleon'],
    types: ['fire', 'water'],
    typeArray: [
      { value: 'water', label: 'Water' }, 
      { value: 'bug', label: 'Bug' }, 
      { value: 'dark', label: 'Dark' }, 
      { value: 'dragon', label: 'Dragon' }, 
      { value: 'electric', label: 'Electric' }, 
      { value: 'fairy', label: 'Fairy' }, 
      { value: 'fighting', label: 'Fighting' }, 
      { value: 'fire', label: 'Fire' }, 
      { value: 'flying', label: 'Flying' }, 
      { value: 'ghost', label: 'Ghost' }, 
      { value: 'grass', label: 'Grass' }, 
      { value: 'ground', label: 'Ground' }, 
      { value: 'ice', label: 'Ice' }, 
      { value: 'normal', label: 'Normal' }, 
      { value: 'poison', label: 'Poison' }, 
      { value: 'psychic', label: 'Psychic' }, 
      { value: 'rock', label: 'Rock' }, 
      { value: 'steel', label: 'Steel' } ],
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

  handleClick = () => {
    this.setState({
      number: (this.state.number - 1),
    })
  }

  handleClick2 = () => {
    this.setState({
      number: (this.state.number + 1),
    })
  }

  render() {
    if (!this.state) return null
    const { number, name, sprite, description, evolutionLine, types, typeArray, value, value2 } = this.state
    return (
      <>
        <section>
          <div className='side1'>
            <img src={sprite} />
            <div className='evoBox'>
              <a>{evolutionLine[0]}</a>
              <a>{evolutionLine[1]}</a>
              <a>{evolutionLine[2]}</a>
            </div>
            <div>
              <button onClick={this.handleClick}>Previous</button>
              <button onClick={this.handleClick2}>Next</button>
            </div>
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
        <Select className= 'select' isMulti options={typeArray} />
      </>
    )
  }
}

export default Pokedex