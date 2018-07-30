import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Movie } from '../Movie';
import { MovieList } from '../MovieList';
import { PARAMETERS } from '../parameters';
import { MovieDetail } from '../MovieDetail';
import { Actor } from '../Actor';
import { ActorList } from '../ActorList';

const MOVIE_WORD: string = "Movie";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  searchBoxText: string = "Type movie name or actor name here, to start the search...";
  moviesTitle: string = "Movies Top";
  movieListTop: Movie[];
  movieSelected: Movie;
  counter: any;
  position: number = 0;
  searchParameter: string = "Movie";
  private searchTerm = new Subject<string>();
  movieListSearch: Movie[] = [];
  actorListSearch: Actor[] = [];
  resultMovieList: Observable<MovieList>;
  resultActorList: Observable<ActorList>;
  searchInputValue: string = "";


  constructor(private movieService: MovieService) { }

  ngOnInit() {
  	//this.movieService.currentMessage.subscribe(message => this.response = message);
    this.getMoviesListTop();
    this.searchActorOrMoviesName();
  }

  getMoviesListTop(){
    this.movieService.getMoviesListTop().subscribe(
      (result: MovieList) => {
          if(result){
            this.movieListTop = result.results.slice(0,12);
            this.movieListTop = this.getImageMovieFullPath(this.movieListTop);
            this.getMovieDetailTop(this.movieListTop[0]);            
          }
      }
    );  
  }

  getImageMovieFullPath(movies: Movie[]) :Movie[]{
    for(let movie of movies){
      movie.poster_path = PARAMETERS.IMG_URL_BASE+movie.poster_path;
      movie.backdrop_path = PARAMETERS.IMG_URL_BASE+movie.backdrop_path;
    }
    return movies;
  }

  getMovieDetailTop(movie: Movie){
    if(movie){
      this.movieSelected = movie;
      this.movieService.getMovieDetail(movie.id).subscribe(
        (result: MovieDetail) => {
          if(result){
            this.movieSelected.movieDetail = result;
            this.movieService.sendDetail(this.movieSelected);
          }
        });
    }
  }

  setSearchParameter(parameter){
    this.searchParameter = parameter;
    this.actorListSearch = [];
    this.movieListSearch = [];
  }

  search(term: string): void {
    this.searchTerm.next(term);
    if(this.searchParameter == MOVIE_WORD){
        this.resultMovieList.subscribe(
        (result: MovieList) => {
          if(result){
            this.movieListSearch = result.results;
            this.movieListTop = this.movieListSearch.slice(0,12);
            this.movieListTop = this.getImageMovieFullPath(this.movieListTop);
            this.getMovieDetailTop(this.movieListTop[0]); 
          }
        });
        this.actorListSearch = [];
    }
    else{
      this.resultActorList.subscribe(
      (result: ActorList) => {
        if(result){
          this.actorListSearch = result.results;
          this.movieListTop = [];
          for(let actor of this.actorListSearch){
            console.log("Cantidad de peliculas "+this.movieListTop.length);
              if(this.movieListTop.length < 12){
                  if(this.movieListTop.length == 0){
                    this.movieListTop = actor.known_for;
                    console.log(actor.known_for);
                  }
                  else{
                    this.movieListTop = this.movieListTop.concat(actor.known_for);  
                  }
              } 
              else{
                break;
              } 
          }
          this.movieListTop = this.movieListTop.slice(0,12);
          this.movieListTop = this.getImageMovieFullPath(this.movieListTop);
          this.getMovieDetailTop(this.movieListTop[0]);
        }
      });
      this.movieListSearch = [];
    }
  }

  searchActorOrMoviesName(){   
      this.resultMovieList = this.searchTerm.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => this.movieService.searchMovies(term),)
      );     

      this.resultActorList = this.searchTerm.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => this.movieService.searchActors(term)),
      );
  }

  findMovieDetail(movie: Movie){
    this.actorListSearch = [];
    this.movieListSearch = [];
    this.moviesTitle = "Others interesting movies...";
    this.searchInputValue = movie.title;
    this.getMovieDetailTop(movie);
  }

  findActorDetail(actor: Actor){
    this.actorListSearch = [];
    this.movieListSearch = [];
    this.moviesTitle = "Others interesting movies...";
    this.searchInputValue = actor.name;
    this.search(this.searchInputValue);
  }

}
