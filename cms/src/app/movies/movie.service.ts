import { EventEmitter, Injectable } from '@angular/core';
import { Movie } from './movies.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private maxMovieId!: number;
  startedEditing = new Subject<number>();


  movieListChangedEvent = new Subject<Movie[]>();
  movieSelectedEvent = new EventEmitter<Movie>();

  private movies: Movie[] = [];

  constructor(private http: HttpClient) {

    this.maxMovieId = this.getMaxId();

  }



  getMovies() {



    this.http.get<{ message: string; movies: Movie[] }>('http://127.0.0.1:4200/movies')
      .subscribe(
        (moviesData) => {
          this.movies = moviesData.movies;
          this.maxMovieId = this.getMaxId();
          this.movies.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0);

          console.log(moviesData)

          this.movieListChangedEvent.next(this.movies.slice());
          (error: any) => {
            console.log(error);
          }
        })
  }



  getMovie(id: string): Movie {
    for (const movie of this.movies) {
      if (movie.id == id) {
        return movie;
      }
    }
    return null!;
  }


  getMaxId(): number {

    let maxId = 1
    let currentId = 0;
    for (const movie of this.movies) {
      currentId == parseInt(movie.id);
      if (currentId > maxId) {
        maxId = currentId
      }
      console.log('getMaxId is working on Movies')
    }
    return maxId
  }

  sortAndSend() {
    this.movies.sort((a, b) => a.name < b.name ? -1 : 0);
    this.movieListChangedEvent.next(this.movies.slice());
  }

  deleteMovie(movie: Movie) {

    if (!movie) {
      return;
    }

    const pos = this.movies.findIndex(d => d.id === movie.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://127.0.0.1:4200/movies/' + movie.id)
      .subscribe(
        () => {
          this.movies.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }


  addMovie(movie: Movie) {
    if (!movie) {
      return;
    }

    movie.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http.post<{ message: string, movie: Movie }>('http://127.0.0.1:4200/movies/',
      movie,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.movies.push(responseData.movie);
          this.sortAndSend();
        }
      );
  }


  updateMovie(originalMovie: Movie, newMovie: Movie) {
    if (!originalMovie || !newMovie) {
      return;
    }

    const pos = this.movies.findIndex(d => d.id === originalMovie.id);

    if (pos < 0) {
      return;
    }

    newMovie.id = originalMovie.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http.put('http://127.0.0.1:4200/movies/' + originalMovie.id,
      newMovie, { headers: headers })
      .subscribe(
        () => {
          this.movies[pos] = newMovie;
          this.movies.sort((a, b) => a.name < b.name ? -1 : 0);
          this.movieListChangedEvent.next(this.movies.slice());
        }
      );
  }


  storeMovies() {
    let movies = JSON.stringify(this.movies);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });


    this.http.put('http://127.0.0.1:4200/movies/', movies, { headers: headers })
      .subscribe(
        () => {

          this.movieListChangedEvent.next(this.movies.slice());
        }
      )
  }
}