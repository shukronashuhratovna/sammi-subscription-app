import MuiModal from '@mui/material/Modal'
import { useInfoStore } from 'src/store'
import { FaPlay, FaPlus, FaTimes } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import { ElementType } from 'src/interfaces/app.interface';
import ReactPlayer from 'react-player';
import { BsVolumeDown, BsVolumeMute } from 'react-icons/bs';


const Modal = () => {
    const base_url = process.env.NEXT_PUBLIC_API_DOMAIN as string;
    const api_key = process.env.NEXT_PUBLIC_API_KEY as string;

    const { isOpenModal, setOpenModal, currentMovie } = useInfoStore()
    const [trailer, setTrailer] = useState<String>('');
    const [muted, setMuted] = useState<boolean>(true)
    const closeModal = () => setOpenModal(false);

    const api = `${base_url}/${currentMovie?.media_type === 'tv' ? 'tv' : 'movie'}/
    ${currentMovie.id}/videos?api_key=${api_key}&language=en-US`

    useEffect(() => {
        const getData = async () => {
            const data = await fetch(api).then(res => res.json())
            if (data?.results) {
                const index = data.results.findIndex((el: ElementType) => el.type === 'Trailer')
                setTrailer(data.results[index].key);
            }


        }
        getData()
    },
        // eslint-disable-next-line
        [currentMovie])


    return (
        <MuiModal open={isOpenModal} onClose={closeModal}
            className='fixed top-7 left-0 right-0 w-full mx-auto max-w-4xl overflow-hidden overflow-y-scroll scrollbar-hide z-60'>
            <>
                <button onClick={() => setOpenModal(false)}
                    className='modalBtn absolute top-5 right-5 !z-40 bg-[#181818] h-9 w-9 border-none'>
                    <FaTimes />
                </button>
                <div className='relative pt-[55%]'>
                    <ReactPlayer url={`https://www.youtube.com/watch?v=${trailer}`} width={'100%'} height={'100%'} playing
                        className={'absolute top-0 left-0'} muted={muted}
                    />
                    <div className='absolute bottom-10 flex w-full items-center justify-between px-18'>
                        <div className='flex space-x-2'>
                            <button className='flex items-center gap-x-2 rounded bg-white px-8 py-2 text-xl font-bold text-black transition hover:bg-[#e6e6e6]'>
                                <FaPlay className='h-7 w-7 text-black' />
                                Play
                            </button>
                            <button className='modalBtn'>
                                <FaPlus className='h-5 w-5' />
                            </button>
                            <button className='modalBtn' onClick={() => setMuted(prev => !prev)}>
                                {muted ? <BsVolumeMute className='h-7 w-7' /> : <BsVolumeDown className='h-7 w-7' />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className='flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8'>
                    <div className='space-y-6 text-lg'>
                        <div className='flex items-center space-x-2 text-sm'>
                            <p className='font-semibold text-green-400'>{currentMovie!.vote_average * 10}% Match</p>
                            <p className='font-light'>{currentMovie?.release_date}</p>
                            <div className='flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs'>HD</div>
                        </div>

                        <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
                            <p className='w-5/6'>{currentMovie?.overview}</p>
                            <div className='flex flex-col space-y-3 text-sm'>
                                <div>
                                    <span className='text-[gray]'>Original language:</span> {currentMovie?.original_language}
                                </div>

                                <div>
                                    <span className='text-[gray]'>Total votes:</span> {currentMovie?.vote_count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>

    )
}

export default Modal