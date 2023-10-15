import { IMovie } from "src/interfaces/app.interface";

export interface RowProps {
    movie: IMovie[],
    title: string,
    isBig?: boolean
}