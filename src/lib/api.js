import axios from 'axios'

// const baseURL = 'https://pokeapi.glitch.me/v1'

const config = {
  headers: {
    'User-Agent': 'BastionDiscordBot (https://bastionbot.org, 6.16.1)',
  },
}

export const getPokemonByNumber = () => {
  // return axios.get(`${baseURL}/pokemon/${id}`)
  return axios.get('https://pokeapi.glitch.me/v1/pokemon/7', config)
}