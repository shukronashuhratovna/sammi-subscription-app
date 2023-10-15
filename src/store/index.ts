import { IMovie } from 'src/interfaces/app.interface'
import { create } from 'zustand'

interface InfoState {
    isOpenModal: boolean,
    currentMovie: IMovie,
    setOpenModal: (isOpen: boolean) => void,
    setCurrentMovie: (movie: IMovie) => void
}

export const useInfoStore = create<InfoState>()(set => ({
    isOpenModal: false,
    currentMovie: {} as IMovie,
    setOpenModal: (isOpen: boolean) => set(state => ({ ...state, isOpenModal: isOpen })),
    setCurrentMovie: (currentMovie: IMovie) => set(state => ({ ...state, currentMovie }))
}))