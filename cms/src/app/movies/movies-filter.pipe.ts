import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from './movies.model';
@Pipe({
  name: 'moviesFilter'
})
export class MoviesFilterPipe implements PipeTransform {

  transform(movies: Movie[], term: string) {

    let filteredMovies: Movie[] = [];
    if (term && term.length > 0) {
      filteredMovies = movies.filter(
        (movie: Movie) => movie.name.toLowerCase().includes(term.toLowerCase()));

    }
    if (filteredMovies.length < 1) {
      return movies;
    }
    return filteredMovies;
  }
}