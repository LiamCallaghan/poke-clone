import axios from 'axios'

const baseURL = 'https://pokeapi.co/api/v2'


export const getPokemonByNumber = id => {
  return axios.get(`${baseURL}/pokemon/${id}`)
}