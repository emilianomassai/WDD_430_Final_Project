import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Movie } from '../movies.model';
import { MovieService } from '../movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  @Output() selectedMovieEvent = new EventEmitter<Movie>();

  term: String = '';


  movies: Movie[] = [];

  private subscription!: Subscription;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {


    this.subscription = this.movieService.movieListChangedEvent.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      }
    )

    this.movieService.getMovies();
  }


  // TO CHANGE THIS WITH REAL DATA

  onAdd() {

  }

  search(value: String) {

    this.term = value;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
