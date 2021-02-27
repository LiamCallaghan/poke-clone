import React from 'react'
import { getPokemonByNumber, getPokemonInfo, getEvolutionChain } from '../../lib/api'

class Pokedex extends React.Component {
  state = {
    number: 1,
    name: 'Bulbasaur',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    otherSprite: '',
    description: 'seed Pokemon',
    flavorText: 'Loading...',
    evolutionIndex: [ 0, 1, 2],
    evolutionLine: [ 'bulbasaur', 'ivysaur', 'venusaur'],
    evolutionSprites: [ 
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', 
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'
    ],
    types: ['grass', 'poison'],
    count: 0,
    value: '',
    value2: '',
    trueValue: '',
    openCheck: 'closed',
  }

  async componentDidMount() {
    this.newPokemon(this.state.number)
  }

  async newPokemon(id){
    const response = await getPokemonByNumber(id)
    const info = await getPokemonInfo(id)
    const evoChain = await getEvolutionChain(info.data.evolution_chain.url)
    // console.log(evoChain.data.chain.species.url.slice(-5).replace(/[^0-9]/g, ''))
    // console.log(response.data)
    // this.evolutionTest(evoChain.data.chain.evolves_to)
    const randomTextArray = []
    const capitalName = (response.data.name).charAt(0).toUpperCase() + (response.data.name).slice(1)
    info.data.flavor_text_entries.forEach( entry => {
      if (entry.language.name === 'en') {
        randomTextArray.push(entry.flavor_text)
      }
    })
    // console.log(randomTextArray)
    this.setState({
      name: capitalName,
      sprite: response.data.sprites.front_default,
      otherSprite: response.data.sprites.back_default,
      number: response.data.id,
      description: info.data.genera[7].genus,
      flavorText: randomTextArray[Math.floor(Math.random() * randomTextArray.length)],
      evolutionIndex: [0],
      evolutionLine: [evoChain.data.chain.species.name],
      evolutionSprites: [this.pokemonSprite(evoChain.data.chain.species.url.slice(-5).replace(/[^0-9]/g, ''))],
    })
    // console.log(this.state.evolutionSprites[0])

    if (evoChain.data.chain.evolves_to.length === 1) {
      this.setState({
        evolutionIndex: [0, 1],
        evolutionLine: [this.state.evolutionLine[0], evoChain.data.chain.evolves_to[0].species.name],
        evolutionSprites: [this.state.evolutionSprites[0], this.pokemonSprite(evoChain.data.chain.evolves_to[0].species.url.slice(-5).replace(/[^0-9]/g, ''))],
      })
      if (evoChain.data.chain.evolves_to[0].evolves_to.length === 1) {
        this.setState({
          evolutionIndex: [0, 1, 2],
          evolutionLine: [this.state.evolutionLine[0], this.state.evolutionLine[1], evoChain.data.chain.evolves_to[0].evolves_to[0].species.name],
          evolutionSprites: [this.state.evolutionSprites[0], this.state.evolutionSprites[1], this.pokemonSprite(evoChain.data.chain.evolves_to[0].evolves_to[0].species.url.slice(-5).replace(/[^0-9]/g, ''))],
        })
      } else if (evoChain.data.chain.evolves_to[0].evolves_to.length > 1) {
        this.setState({
          evolutionIndex: [0, 1, 2, 3],
          evolutionLine: [this.state.evolutionLine[0], this.state.evolutionLine[1], evoChain.data.chain.evolves_to[0].evolves_to[0].species.name, evoChain.data.chain.evolves_to[0].evolves_to[1].species.name],
          evolutionSprites: [this.state.evolutionSprites[0], this.state.evolutionSprites[1], this.pokemonSprite(evoChain.data.chain.evolves_to[0].evolves_to[0].species.url.slice(-5).replace(/[^0-9]/g, '')), this.pokemonSprite(evoChain.data.chain.evolves_to[0].evolves_to[1].species.url.slice(-5).replace(/[^0-9]/g, ''))],
        })
      }
    } else if (evoChain.data.chain.evolves_to.length > 1) {
      // console.log(evoChain.data.chain.evolves_to)
      this.setState({
        evolutionIndex: [0, 1, 2],
        evolutionLine: [this.state.evolutionLine[0], evoChain.data.chain.evolves_to[0].species.name, evoChain.data.chain.evolves_to[1].species.name],
        evolutionSprites: [this.state.evolutionSprites[0], this.pokemonSprite(evoChain.data.chain.evolves_to[0].species.url.slice(-5).replace(/[^0-9]/g, '')), this.pokemonSprite(evoChain.data.chain.evolves_to[1].species.url.slice(-5).replace(/[^0-9]/g, ''))],
      })
      if (evoChain.data.chain.evolves_to.length > 2) {
        this.setState({
          evolutionIndex: [0, 1, 2, 3],
          evolutionLine: [this.state.evolutionLine[0], this.state.evolutionLine[1], this.state.evolutionLine[2], evoChain.data.chain.evolves_to[2].species.name],
          evolutionSprites: [this.state.evolutionSprites[0], this.state.evolutionSprites[1], this.state.evolutionSprites[2], this.pokemonSprite(evoChain.data.chain.evolves_to[2].species.url.slice(-5).replace(/[^0-9]/g, ''))],
        })
        if (evoChain.data.chain.evolves_to.length === 8) {
          this.setState({
            evolutionIndex: [0, 1, 2, 3, 4, 5, 6, 7],
            evolutionLine: [this.state.evolutionLine[0], this.state.evolutionLine[1], this.state.evolutionLine[2], this.state.evolutionLine[3], evoChain.data.chain.evolves_to[3].species.name, evoChain.data.chain.evolves_to[4].species.name, evoChain.data.chain.evolves_to[5].species.name, evoChain.data.chain.evolves_to[6].species.name, evoChain.data.chain.evolves_to[7].species.name],
            evolutionSprites: [this.state.evolutionSprites[0], this.state.evolutionSprites[1], this.state.evolutionSprites[2], this.state.evolutionSprites[3], this.pokemonSprite(evoChain.data.chain.evolves_to[3].species.url.slice(-5).replace(/[^0-9]/g, '')), this.pokemonSprite(evoChain.data.chain.evolves_to[4].species.url.slice(-5).replace(/[^0-9]/g, '')), this.pokemonSprite(evoChain.data.chain.evolves_to[5].species.url.slice(-5).replace(/[^0-9]/g, '')), this.pokemonSprite(evoChain.data.chain.evolves_to[6].species.url.slice(-5).replace(/[^0-9]/g, '')), this.pokemonSprite(evoChain.data.chain.evolves_to[7].species.url.slice(-5).replace(/[^0-9]/g, ''))],
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

  pokemonSprite(id){
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
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
    console.log(event.target.value)
    if (event.target.value !== this.state.name) {
      this.newPokemon(event.target.value)
    }
  }

  handleClick5 = () => {
    this.setState({
      openCheck: 'closed animate',
    })
  }

  handleClick6 = () => {
    this.setState({
      openCheck: 'open',
    })
  }

  render() {
    if (!this.state) return null
    const { number, name, sprite, description, flavorText, types, evolutionIndex, evolutionLine, evolutionSprites, value, value2, openCheck } = this.state
    return (
      <>
        <section>
          <div className={`side1 ${openCheck}`}>
            <div className={`onLight ${openCheck}`}></div>
            <div className={`onButton ${openCheck}`} onClick={this.handleClick6}></div>
            <div className={`searchInputs ${openCheck}`}>
              <form onSubmit={this.handleSubmit}>
                <input className='textInput' type='text' placeholder='Pokemon name' value={value} onChange={this.handleChange} />
                <input className='numberInput' type='number' placeholder='0' value={value2} onChange={this.handleChange2} />
                <input className='submitButton' type='submit' value='Search' />
              </form>
            </div>
            <div className={`spriteBox ${openCheck}`}>
              <img className='pokemonSprite' src={sprite} />
              <button className='flip' onClick={this.handleClick3}>Flip</button>
            </div>
            <div className={`bottomBox ${openCheck}`}>
              <div className='evoBox'>
                {evolutionIndex.map(evolution => {
                  return <img className='evolutionSprite' onClick={this.handleClick4} value={evolutionLine[evolution]} key={evolution} src={evolutionSprites[evolution]} />
                })}
              </div>
              <div className='scrollButtons'>
                <button className='prev' onClick={this.handleClick}></button>
                <button className='next' onClick={this.handleClick2}></button>
              </div>
            </div>
          </div>
          <div className='hinge'></div>
          <div className={`side2 ${openCheck}`}>
            <div className='closeButton' onClick={this.handleClick5}></div>
            <div className='infoTop'>
              <div className='info1'>
                <h1 className='infoText1'>{name}</h1>
                <h1 className='infoText1'>#{number}</h1>
              </div>
              <h1>The {description}.</h1>
            </div>
            <div className='infoBottom'>
              <div>
                <ul>
                  {types.map(indType => {
                    return <li key={indType}><h1>{(indType)}</h1></li>
                  })}
                </ul>
              </div>
              <h3 className='flavorText'>{flavorText}</h3>
            </div>
            <div className='decorative'>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className='blueSquare'></div>
              <div className='blueSquare'></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className='blueSquare'></div>
              <div className='blueSquare'></div>
              <div className='blueSquare'></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className='blueSquare'></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className='blueSquare'></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className='blueSquare'></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className='blueSquare'></div>
              <div className={`blueSquare change${Math.floor(Math.random() * 4) + 1}`}></div>
              <div className='blueSquare'></div>
            </div>
          </div>
        </section>
        {/* <Select className= 'select' isMulti options={typeArray} /> */}
      </>
    )
  }
}

export default Pokedex