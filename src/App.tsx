import React from 'react'
import axios from 'axios'
import queryString from 'query-string'
import { useInfiniteQuery } from 'react-query'
import './App.css'

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
              <div className='pokemon cursor-pointer mx-auto' onClick={() => { }} key={poke.name}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(poke.url as string).split('/').at(-2)}.png`} alt={poke.name} />
                <p>{poke.name}</p>
              </div>
            ))

          );
        })}
      </div>

    </div >
  );
}

export default App;
