import axios from 'axios'

const baseURL = 'https://pokeapi.co/api/v2'


export const getPokemonByNumber = id => {
  return axios.get(`${baseURL}/pokemon/${id}`)
}

export const getPokemonInfo = id => {
  return axios.get(`${baseURL}/pokemon-species/${id}`)
}

export const getEvolutionChain = URL => {
  return axios.get(URL)
}