import React, { useCallback, useRef, useState } from 'react'
import Pokemon from './Components/Pokemon/Pokemon'
import { usePokemons } from './Hooks/usePokemons'
import PokeBall from './Components/PokeBall/PokeBall'
import './App.css'

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

  const observer = useRef<IntersectionObserver | null>(null)
  const LoaderRef = useCallback((node: any) => {
    if (status === 'loading') return
    if (observer.current) observer.current?.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })
    if (node) observer.current.observe(node)
  }, [status, hasNextPage, fetchNextPage])

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

      <div ref={LoaderRef} className='w-full'>
        <div
          className='fixed bottom-0 left-1/2 -translate-x-1/2 flex justify-center items-center' >
          <PokeBall width={100} height={100}
            isFetching={isFetching || isFetchingNextPage} className='mx-auto' loadingMessage='Loading ...' />
        </div>
      </div>

    </div >
  );
}

export default App;
