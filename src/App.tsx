import React from 'react'
import axios from 'axios'
import queryString from 'query-string'
import { useInfiniteQuery } from 'react-query'
import './App.css'
import Pokemon from './Components/Pokemon/Pokemon'

const fetchPokemons = async (pageParam = 0) => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}`,
  )
  return data
}

function App() {
  const {
    data,
    status
  } = useInfiniteQuery(['poke'], ({ pageParam }) => fetchPokemons(pageParam), {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) {
        const parsed = queryString.parseUrl(lastPage.next)
        return parsed.query.offset
      }

      return null
    },
  })

  if (status === 'loading') return (
    <div className='flex justify-center items-center w-full h-full'>
      loading...
    </div>
  )

  if (status === 'error') return <p>error...</p>

  return (
    <div className="App">

      <h1 className='fixed top-0 w-full text-center'>Pokémons</h1>
      <div className='pokemons flex flex-wrap'>
        {data?.pages.map((page) => {
          return (
            page.results.map((poke: any) => (
              <Pokemon onClick={() => { }} pokemon={poke} key={poke.url} />
            ))

          );
        })}
      </div>

    </div >
  );
}

export default App;
