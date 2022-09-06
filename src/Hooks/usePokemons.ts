import axios from 'axios'
import queryString from 'query-string'
import { useInfiniteQuery } from 'react-query'

const fetchPokemons = async (pageParam = 0) => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}`,
  )
  return data
}

export const usePokemons = () => {
  const queryResult = useInfiniteQuery(
    ['poke'],
    ({ pageParam }) => fetchPokemons(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next) {
          const parsed = queryString.parseUrl(lastPage.next)
          return parsed.query.offset
        }

        return null
      },
    },
  )

  return queryResult
}
