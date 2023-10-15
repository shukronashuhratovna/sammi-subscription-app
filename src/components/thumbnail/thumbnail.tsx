import Image from "next/image";
import ReactStars from "react-stars";
import { image_base } from "src/helpers/constants";
import { IMovie } from "src/interfaces/app.interface"
import { useInfoStore } from "src/store";

const Thumbnail = ({ movie, isBig }: ThumbnailProps) => {
    const { setOpenModal, setCurrentMovie } = useInfoStore();

    const handleClick = () => {
        setOpenModal(true);
        setCurrentMovie(movie);
    }
    return (
        <div onClick={handleClick}
            className={`relative ${isBig ? 'h-[450px] md:h-[600px] min-w-[350px] md:min-w-[470px]' : 'h-[330px] md:h-[440px] min-w-[200px] md:min-w-[292px]'} cursor-pointer transition duration-200 ease-out  md:hover:scale-110`}>
            <Image
                src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
                alt={movie?.title || movie?.name || movie?.original_name}
                fill
                sizes="100% 100%"
                className="rounded-sm md:rounded object-cover"
            />

            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40" />
            <div className="absolute bottom-6 left-4 right-2">

                <div className="flex items-center space-x-2">
                    <ReactStars edit={false} count={10} value={movie?.vote_average} color2={'#fff'} />
                    <p className="">({movie?.vote_count})</p>
                </div>

                <h1 className="text-2xl max-w-xs md:max-w-lg  font-bold md:text-4xl " >
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

            </div>

        </div>
    )
}

export default Thumbnail

export interface ThumbnailProps {
    movie: IMovie;
    isBig: boolean;
}