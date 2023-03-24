import { Component, OnInit } from '@angular/core';
import { Movie } from './movies.model';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MovieService]
})
export class MoviesComponent implements OnInit {
  selectedMovie!: Movie;

  constructor() { }

  ngOnInit(): void {
  }

}
