import axios from 'axios'
import { useQuery } from 'react-query'

const getPokemon = async (id: number) => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-form/${id}/`,
  )
  return data
}

const usePokemon = (url: string) => {
  const result = useQuery(['poke', url], () => {
    let id = Number(url?.split('/').at(-2))
    if (id) return getPokemon(id)
    return false
  })
  return result
}

export default usePokemon
