import { Actor } from './Actor'


export interface ActorList{
  page: number,
  total_results: number,
  total_pages: number,
  results: Actor[]
}