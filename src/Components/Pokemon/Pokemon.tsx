interface PokemonProps {
    onClick: () => void
    pokemon: { name: string, url: string }
}

const Pokemon = ({ pokemon, onClick }: PokemonProps) => {
    let pokemonId: number = Number(pokemon.url?.split('/').at(-2))
    return (
        <>
            <div className='pokemon flex flex-col justify-center items-center w-64 md:w-72 cursor-pointer mx-auto my-5'>
                <button className='hover:bg-slate-200 rounded-md p-5' onClick={() => onClick()} key={pokemon.name}>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} alt={pokemon.name} />
                    <p>{pokemon.name}</p>
                </button>
            </div>
        </>
    );
};

export default Pokemon;