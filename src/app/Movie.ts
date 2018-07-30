import { MovieDetail } from './MovieDetail';

export interface Movie{
	vote_count: number,
    id: number,
    video: boolean,
    vote_average: 9.3,
    title: string,
    popularity: number,
    poster_path: string,
    original_language: string,
    original_title: string,
    genre_ids: number[],
    backdrop_path: string,
    adult: boolean,
    overview: string,
    release_date: string,
    movieDetail: MovieDetail
}