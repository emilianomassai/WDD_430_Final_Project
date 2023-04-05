import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TrendingMovie } from './trendingMovies.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrendingMovieService {
  trendingMovieChangedEvent = new EventEmitter<TrendingMovie[]>();

  trendingMovieListChangedEvent = new Subject<TrendingMovie[]>();

  maxTrendingMovieId: number;
  public data: any = [];
  public topRated: any = [];

  private trendingMovies: TrendingMovie[] = [];

  constructor(private http: HttpClient) {

    this.maxTrendingMovieId = this.getMaxId();
  }


  findTrending() {
    return this.http.get('https://api.themoviedb.org/3/trending/all/day?api_key=f4ec058abc3d746728270f736f4851fd');

  }

  getTrendingMovies() {

  }



  getTrendingMovie(id: string): TrendingMovie {


    return null!;

  }


  getMaxId(): number {
    let maxId = 0;
    for (const trendingMovie of this.trendingMovies) {
      const currentId = +trendingMovie.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addTrendingMovie(newTrendingMovie: TrendingMovie) {
    if (newTrendingMovie === null || newTrendingMovie === undefined) {
      return;
    }



    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    newTrendingMovie.id = '';
    const strTrendingMovie = JSON.stringify(newTrendingMovie);

    this.http.post('http://127.0.0.1:4200/trendingMovies/', strTrendingMovie, { headers: headers })
      .subscribe(
        () => {
          this.trendingMovieChangedEvent.next(this.trendingMovies.slice());
        });
  }

  updateTrendingMovie(originalTrendingMovie: TrendingMovie, newTrendingMovie: TrendingMovie) {
    if (!originalTrendingMovie || !newTrendingMovie) {
      return;
    }

    const pos = this.trendingMovies.findIndex(c => c.id === originalTrendingMovie.id);

    if (pos < 0) {
      return;
    }

    newTrendingMovie.id = originalTrendingMovie.id;


    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });


    this.http.patch('http://127.0.0.1:4200/trendingMovies/' + originalTrendingMovie.id
      , newTrendingMovie, { headers: headers })
      .subscribe(
        () => {
          this.trendingMovies[pos] = newTrendingMovie;
          this.trendingMovieListChangedEvent.next(this.trendingMovies.slice());
        });
  }

  deleteTrendingMovie(trendingMovie: TrendingMovie) {


  }

  storeTrendingMovies() {
    let trendingMovies = JSON.stringify(this.trendingMovies);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('https://api.themoviedb.org/3/trending/all/day?api_key=f4ec058abc3d746728270f736f4851fd', trendingMovies, { headers: headers })
      .subscribe(
        () => {
          this.trendingMovieListChangedEvent.next(this.trendingMovies.slice());
        }
      )
  }

}