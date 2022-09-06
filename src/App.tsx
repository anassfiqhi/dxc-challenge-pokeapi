import { useState } from 'react'
import Pokemon from './Components/Pokemon/Pokemon'
import { usePokemons } from './Hooks/usePokemons'
import PokeBall from './Components/PokeBall/PokeBall'
import './App.css'
import useLoader from './Hooks/useLoader'

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

  const LoaderRef = useLoader(() => fetchNextPage(), { status, hasNextPage: !!hasNextPage })

  if (status === 'loading') return (
    <div className='flex justify-center items-center w-full h-full'>
      loading...
    </div>
  )

  if (status === 'error') return <p>error...</p>

  return (
    <div className='App flex flex-col max-w-3xl md:max-w-4xl mx-auto'>
      <h1 className='sticky top-0 w-full text-center bg-slate-50 text-5xl'>Pokémons</h1>
      <div className='flex flex-wrap'>

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
