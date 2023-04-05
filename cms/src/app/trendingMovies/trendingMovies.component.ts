import { Component, OnInit } from '@angular/core';
import { TrendingMovie } from './trendingMovies.model';
import { TrendingMovieService } from './trendingMovie.service';

@Component({
  selector: 'app-trendingMovies',
  templateUrl: './trendingMovies.component.html',
  styleUrls: ['./trendingMovies.component.css'],
  providers: [TrendingMovieService]

})
export class TrendingMoviesComponent implements OnInit {
  selectedTrendingMovie!: TrendingMovie;
  constructor(private trendingMovieService: TrendingMovieService) { }

  ngOnInit(): void {
    this.trendingMovieService.trendingMovieChangedEvent.subscribe((trendingMovie: TrendingMovie) => {
      this.selectedTrendingMovie = trendingMovie;
    })


    this.trendingMovieService.findTrending().subscribe(response => {

    }, error => {

    });
  }


}
