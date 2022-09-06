import React, { useState } from 'react'
import axios from 'axios'
import queryString from 'query-string'
import { useInfiniteQuery } from 'react-query'
import './App.css'
import Pokemon from './Components/Pokemon/Pokemon'
import { usePokemons } from './Hooks/usePokemons'

function App() {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching
  } = usePokemons()

  const [selected, setSelected] = useState<string>()

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
              <Pokemon onClick={() => setSelected(poke.url)} pokemon={poke} key={poke.url} />
            ))

          );
        })}
      </div>

    </div >
  );
}

export default App;
