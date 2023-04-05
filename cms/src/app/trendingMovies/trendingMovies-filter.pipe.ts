import { Pipe, PipeTransform } from '@angular/core';
import { TrendingMovie } from './trendingMovies.model';

@Pipe({
  name: 'trendingMoviesFilter'
})
export class TrendingMoviesFilterPipe implements PipeTransform {

  transform(trendingMovies: TrendingMovie[], term: string) {

    let filteredTrendingMovies: TrendingMovie[] = [];
    if (term && term.length > 0) {
      // filteredTrendingMovies = trendingMovies.filter(
      //   (trendingMovie: TrendingMovie) => TrendingMovie.title.toLowerCase().includes(term.toLowerCase()));

    }
    if (filteredTrendingMovies.length < 1) {
      return trendingMovies;
    }
    return filteredTrendingMovies;
  }
}