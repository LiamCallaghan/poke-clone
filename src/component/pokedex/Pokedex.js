import React from 'react'
import Select from 'react-select'
import { getPokemonByNumber, getPokemonInfo, getEvolutionChain } from '../../lib/api'

class Pokedex extends React.Component {
  state = {
    number: 1,
    name: 'test',
    sprite: '',
    otherSprite: '',
    description: 'default',
    flavorText: 'default',
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
    count: 0,
    value: '',
    value2: '',
    trueValue: '',
  }

  async componentDidMount() {
    this.newPokemon(this.state.number)
  }

  async newPokemon(newID){
    const response = await getPokemonByNumber(newID)
    const info = await getPokemonInfo(newID)
    const evoChain = await getEvolutionChain(info.data.evolution_chain.url)
    console.log(evoChain.data.chain)
    console.log(response.data)
    // this.evolutionTest(evoChain.data.chain.evolves_to)
    const randomTextArray = []
    info.data.flavor_text_entries.forEach( entry => {
      if (entry.language.name === 'en') {
        randomTextArray.push(entry.flavor_text)
      }
    })
    // console.log(randomTextArray)
    this.setState({
      name: response.data.name,
      sprite: response.data.sprites.front_default,
      otherSprite: response.data.sprites.back_default,
      number: response.data.id,
      description: info.data.genera[7].genus,
      flavorText: randomTextArray[Math.floor(Math.random() * randomTextArray.length)],
    })
    if (response.data.types.length > 1) {
      this.setState({
        types: [response.data.types[0].type.name, response.data.types[1].type.name],
      })
    } else {
      this.setState({
        types: [response.data.types[0].type.name],
      })
    }
  }

  // evolutionTest(string){
  //   const arr = []
  //   function evolutionNest(nestString){
  //     if (nestString.length > 0) {
  //       console.log(nestString[0].species.name)
  //       arr.push(string[0].species.name)
  //       evolutionNest(nestString[0].evolves_to)
  //     } else {
  //       console.log(arr)
  //       this.setState({
  //         evolutionLine: arr,
  //       })
  //     }
  //   }
  //   evolutionNest(string)
  // }

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
    this.newPokemon(this.state.trueValue)
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
    if (this.state.number === 1) {
      this.setState({
        number: 898,
      })
      this.newPokemon(898)
    } else {
      this.newPokemon(this.state.number - 1)
    }
  }

  handleClick2 = () => {
    this.setState({
      number: (this.state.number + 1),
    })
    if (this.state.number === 898) {
      this.setState({
        number: 1,
      })
      this.newPokemon(1)
    } else {
      this.newPokemon(this.state.number + 1)
    }
  }

  handleClick3 = () => {
    if (this.state.count === 0) {
      const flip = this.state.otherSprite
      const flop = this.state.sprite
      this.setState({
        count: 1,
        sprite: flip,
        otherSprite: flop,
      })
    } else {
      const flip = this.state.otherSprite
      const flop = this.state.sprite
      this.setState({
        count: 0,
        sprite: flip,
        otherSprite: flop,
      })
    }
  }

  render() {
    if (!this.state) return null
    const { number, name, sprite, description, flavorText, types, evolutionLine, typeArray, value, value2 } = this.state
    return (
      <>
        <section>
          <div className='side1'>
            <img className='pokemonSprite' src={sprite} />
            <div className='evoBox'>
              {evolutionLine.map(evolution => {
                return <a key={evolution}>{evolution}</a>
              })}
            </div>
            <div>
              <button onClick={this.handleClick}>Previous</button>
              <button onClick={this.handleClick2}>Next</button>
              <button onClick={this.handleClick3}>Flip</button>
            </div>
          </div>
          <div className='side2'>
            <p>{number}</p>
            <p>{name}</p>
            <p>The {description}.</p>
            <p>{flavorText}</p>
            <ul>
              {types.map(indType => {
                return <li key={indType}>{(indType)}</li>
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