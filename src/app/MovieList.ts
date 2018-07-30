import { Movie } from './Movie';

export interface MovieList {

	page: number,
    total_results: number,
    total_pages: number,
    results: Movie[]
}