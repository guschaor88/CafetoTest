import { TvShow } from './TvShow'

export interface TvShowList{
	page: number,
	total_results: number,
	total_pages: number,
	results: TvShow[]
}