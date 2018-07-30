import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../Movie';
import { PARAMETERS } from '../parameters';
import { ProductionCompany } from '../ProductionCompany';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  movieSelected: Movie;
  descriptionTitle: string = "Description: ";
  productionTitle: string = "Production Details: ";
  genresTitle: string = "Genres: ";

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.contentMessage.subscribe(message => {
    	this.movieSelected = message;
    	if(this.movieSelected){
    		if(this.movieSelected.movieDetail.backdrop_path)
    			this.movieSelected.movieDetail.backdrop_path = 	this.getBaseUrlPath(this.movieSelected.movieDetail.backdrop_path);

    		if(this.movieSelected.movieDetail.belongs_to_collection){
	    		if(this.movieSelected.movieDetail.belongs_to_collection.backdrop_path)
			    	this.movieSelected.movieDetail.belongs_to_collection.backdrop_path = 
			    	this.getBaseUrlPath(this.movieSelected.movieDetail.belongs_to_collection.backdrop_path);

		    	if(this.movieSelected.movieDetail.belongs_to_collection.poster_path)
			    	this.movieSelected.movieDetail.belongs_to_collection.poster_path = 
			    	this.getBaseUrlPath(this.movieSelected.movieDetail.belongs_to_collection.poster_path);
		    }
		    	
	    	if(this.movieSelected.movieDetail.poster_path)
	    		this.movieSelected.movieDetail.poster_path = this.getBaseUrlPath(this.movieSelected.movieDetail.poster_path);

	    	for(let productionCompany of this.movieSelected.movieDetail.production_companies){
	    		if(null != productionCompany.logo_path)
	    			productionCompany.logo_path = this.getBaseUrlPath(productionCompany.logo_path);
	    	}
    	}
    });
  }

  getBaseUrlPath(orginalPath){
  	if(orginalPath)
  		orginalPath = PARAMETERS.IMG_URL_BASE+orginalPath;
  	return orginalPath;
  }

}
