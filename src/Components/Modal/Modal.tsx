import ReactDom from 'react-dom'
import usePokemon from '../../Hooks/usePokemon'
import XMark from '../../Icons/x-mark'
import PokemonTypePill from '../PokemonTypePill/PokemonTypePill'

interface ModalProps {
    open: boolean
    url: string
    onClose: () => void
}

export const Modal = ({ open = false, url, onClose }: ModalProps) => {

    const { data, status } = usePokemon(url)

    if (!open) return null

    if (status === 'loading') return <p>Loading ...</p>

    return (
        ReactDom.createPortal(
            <>
                <div className='fixed top-0 bottom-0 right-0 left-0 bg-slate-500 bg-opacity-70 z-[1000]' />
                <div className='fixed rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 z-[1000] aspect-square w-4/5 md:w-[40vw] overflow-hidden' >
                    <div className='flex flex-row-reverse w-full'>
                        <button onClick={onClose} ><XMark /></button>
                    </div>
                    <div className='flex flex-col justify-center items-center h-[95%]'>
                        <h1 className='text-center'>{data?.name}</h1>
                        <img className='block mx-auto w-4/6 aspect-square'
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`}
                            alt={data?.name} />
                        <div className='flex m-5 justify-center items-center'>
                            {data?.types.map((typeObj: { type: { name: any } }) => <PokemonTypePill key={typeObj.type.name} compact={false} pokemonType={typeObj.type.name} />)}
                        </div>
                    </div>
                </div>
            </>,
            document.getElementById('portal')!)
    )
}
export default (Modal)