import { IMovie } from "src/interfaces/app.interface";
import { HeroProps } from "./hero.props";
import { useEffect, useState } from 'react'
import Image from "next/image";
import { image_base } from "src/helpers/constants";
import { TbPlayerPlay } from 'react-icons/tb'
import ReactStars from 'react-stars'
import { useInfoStore } from "src/store";

const Hero = ({ trending }: HeroProps): JSX.Element => {
    const [movie, setMovie] = useState<IMovie>({} as IMovie);
    const { setOpenModal, setCurrentMovie } = useInfoStore();

    const handleClick = () => {
        setOpenModal(true);
        setCurrentMovie(movie);
    }

    useEffect(() => {
        const randomMovie = trending[Math.floor(Math.random() * trending.length)];
        setMovie(randomMovie);
    }, [trending])



    return (
        <div className="flex flex-col space-y-2 md:space-y-4 lg:h-[65vh] lg:pb-12 lg:center py-20">
            <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
                <Image
                    src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
                    alt={movie?.title || movie?.name || movie?.original_name}
                    fill
                    sizes="100vh 100vw"
                    className="object-cover"
                />
            </div>

            <div className="w-[111px] py-[4px] px-[8px] bg-[#b5b5b5]/50 text-center rounded-tr-lg rounded-bl-lg">
                {movie?.media_type}</div>

            <div className="flex items-center space-x-2">
                <ReactStars edit={false} count={10} value={movie?.vote_average} color2={'#fff'} />
                <p className="">({movie?.vote_count})</p>
            </div>

            <h1 className="text-2xl max-w-xs md:max-w-lg lg:max-w-4xl drop-shadow-lg font-bold md:text-4xl lg:text-6xl" >
                {(movie?.title || movie?.name || movie?.original_name)?.slice(0, 30)}
            </h1>
            <p className="max-w-xs md:max-w-lg lg:max-w-3xl text-xs md:text-lg lg:text-2xl">{movie?.overview?.slice(0, 150)}...</p>
            <div>
                <button onClick={handleClick} className="bg-white/40 flex justify-center hover:bg-white/60 transition-all items-center space-x-2  font-bold text-black w-[200px] h-[56px] rounded-full">
                    <TbPlayerPlay className="h-5 w-5 md:h-8 md:w-8" /> Watch now
                </button></div>
        </div >
    )
}

export default Hero