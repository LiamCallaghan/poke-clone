import React from 'react'
// import Select from 'react-select'
import { getPokemonByNumber, getPokemonInfo, getEvolutionChain } from '../../lib/api'

class Pokedex extends React.Component {
  state = {
    number: 1,
    name: 'test',
    sprite: '',
    otherSprite: '',
    description: 'default',
    flavorText: 'default',
    evolutionIndex: [ 0, 1, 2],
    evolutionLine: [ 'squirtle', 'froakie', 'charmeleon'],
    evolutionSprites: [ 'test', 'default', 'testing'],
    placeholderSprites: ['https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'],
    types: ['fire', 'water'],
    // typeArray: [
    //   { value: 'water', label: 'Water' }, 
    //   { value: 'bug', label: 'Bug' }, 
    //   { value: 'dark', label: 'Dark' }, 
    //   { value: 'dragon', label: 'Dragon' }, 
    //   { value: 'electric', label: 'Electric' }, 
    //   { value: 'fairy', label: 'Fairy' }, 
    //   { value: 'fighting', label: 'Fighting' }, 
    //   { value: 'fire', label: 'Fire' }, 
    //   { value: 'flying', label: 'Flying' }, 
    //   { value: 'ghost', label: 'Ghost' }, 
    //   { value: 'grass', label: 'Grass' }, 
    //   { value: 'ground', label: 'Ground' }, 
    //   { value: 'ice', label: 'Ice' }, 
    //   { value: 'normal', label: 'Normal' }, 
    //   { value: 'poison', label: 'Poison' }, 
    //   { value: 'psychic', label: 'Psychic' }, 
    //   { value: 'rock', label: 'Rock' }, 
    //   { value: 'steel', label: 'Steel' } ],
    count: 0,
    value: '',
    value2: '',
    trueValue: '',
    loadCheck: '',
  }

  async componentDidMount() {
    this.newPokemon(this.state.number)
  }

  async newPokemon(id){
    const response = await getPokemonByNumber(id)
    const info = await getPokemonInfo(id)
    const evoChain = await getEvolutionChain(info.data.evolution_chain.url)
    // console.log(evoChain.data.chain)
    // console.log(response.data)
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
      evolutionIndex: [0],
      evolutionLine: [evoChain.data.chain.species.name],
      evolutionSprites: [this.pokemonSprite(evoChain.data.chain.species.name)],
    })
    // console.log(this.state.evolutionSprites[0])

    if (evoChain.data.chain.evolves_to.length === 1) {
      this.setState({
        evolutionIndex: [0, 1],
        evolutionLine: [this.state.evolutionLine[0], evoChain.data.chain.evolves_to[0].species.name],
        evolutionSprites: [this.state.evolutionSprites[0], this.pokemonSprite(evoChain.data.chain.evolves_to[0].species.name)],
      })
      if (evoChain.data.chain.evolves_to[0].evolves_to.length === 1) {
        this.setState({
          evolutionIndex: [0, 1, 2],
          evolutionLine: [this.state.evolutionLine[0], this.state.evolutionLine[1], evoChain.data.chain.evolves_to[0].evolves_to[0].species.name],
          evolutionSprites: [this.state.evolutionSprites[0], this.state.evolutionSprites[1], this.pokemonSprite(evoChain.data.chain.evolves_to[0].species.name)],
        })
      }
    } else if (evoChain.data.chain.evolves_to.length > 1) {
      // console.log(evoChain.data.chain.evolves_to)
      this.setState({
        evolutionIndex: [0, 1, 2],
        evolutionLine: [this.state.evolutionLine[0], evoChain.data.chain.evolves_to[0].species.name, evoChain.data.chain.evolves_to[1].species.name],
        evolutionSprites: [this.state.evolutionSprites[0], this.pokemonSprite(evoChain.data.chain.evolves_to[0].species.name), this.pokemonSprite(evoChain.data.chain.evolves_to[1].species.name)],
      })
      if (evoChain.data.chain.evolves_to.length > 1) {
        this.setState({
          evolutionIndex: [0, 1, 2, 3],
          evolutionLine: [this.state.evolutionLine[0], this.state.evolutionLine[1], this.state.evolutionLine[2], evoChain.data.chain.evolves_to[2].species.name],
          evolutionSprites: [this.state.evolutionSprites[0], this.state.evolutionSprites[1], this.state.evolutionSprites[2], this.pokemonSprite(evoChain.data.chain.evolves_to[2].species.name)],
        })
        if (evoChain.data.chain.evolves_to.length === 8) {
          this.setState({
            evolutionIndex: [0, 1, 2, 3, 4, 5, 6, 7],
            evolutionLine: [this.state.evolutionLine[0], this.state.evolutionLine[1], this.state.evolutionLine[2], this.state.evolutionLine[3], evoChain.data.chain.evolves_to[3].species.name, evoChain.data.chain.evolves_to[4].species.name, evoChain.data.chain.evolves_to[5].species.name, evoChain.data.chain.evolves_to[6].species.name, evoChain.data.chain.evolves_to[7].species.name],
            evolutionSprites: [this.state.evolutionSprites[0], this.state.evolutionSprites[1], this.state.evolutionSprites[2], this.state.evolutionSprites[3], this.pokemonSprite(evoChain.data.chain.evolves_to[3].species.name), this.pokemonSprite(evoChain.data.chain.evolves_to[4].species.name), this.pokemonSprite(evoChain.data.chain.evolves_to[5].species.name), this.pokemonSprite(evoChain.data.chain.evolves_to[6].species.name), this.pokemonSprite(evoChain.data.chain.evolves_to[7].species.name)],
          })
        }
      }
    }
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

  async pokemonSprite(id){
    const response = await getPokemonByNumber(id)
    return response.data.sprites.front_default
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

  handleClick4 = (event) => {
    if (event.target.value !== this.state.name) {
      this.newPokemon(event.target.value)
    }
  }

  render() {
    if (!this.state) return null
    const { number, name, sprite, description, flavorText, types, evolutionIndex, evolutionLine, placeholderSprites, value, value2 } = this.state
    return (
      <>
        <section>
          <div className='side1'>
            <img className='pokemonSprite' src={sprite} />
            <div className='evoBox'>
              {evolutionIndex.map(evolution => {
                return <img onClick={this.handleClick4} value={evolutionLine[evolution]} key={evolution} src={placeholderSprites[evolution]} />
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
        {/* <Select className= 'select' isMulti options={typeArray} /> */}
      </>
    )
  }
}

export default Pokedex