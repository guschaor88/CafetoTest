import { Movie } from './Movie';

export interface Actor{
  popularity: number,
  id: number,
  profile_path: string,
  name: string,
  known_for: Movie[],
  adult: boolean  
}

