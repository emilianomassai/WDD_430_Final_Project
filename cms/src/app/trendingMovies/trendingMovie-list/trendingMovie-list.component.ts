import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrendingMovie } from '../trendingMovies.model';
import { TrendingMovieService } from '../trendingMovie.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'cms-trendingMovie-list',
  templateUrl: './trendingMovie-list.component.html',
  styleUrls: ['./trendingMovie-list.component.css']
})
export class TrendingMovieListComponent implements OnInit, OnDestroy {

  term: String = '';
  data: any = []
  topRated: any;

  trendingMovies: TrendingMovie[] = []


  private subscription!: Subscription;


  constructor(private trendingMovieService: TrendingMovieService, private http: HttpClient, public sanitizer: DomSanitizer
  ) {

  }

  ngOnInit(): void {

    this.subscription = this.trendingMovieService.trendingMovieListChangedEvent
      .subscribe((trendingMovies: TrendingMovie[]) => {
        this.trendingMovies = trendingMovies;
      });


    this.trendingMovieService.getTrendingMovies();
    this.trendingMovieService.findTrending();
    this.getData();


  }
  getData() {
    const url = 'https://api.themoviedb.org/3/trending/all/day?api_key=f4ec058abc3d746728270f736f4851fd'
    this.http.get(url).subscribe((res) => {
      this.data = res
      this.topRated = this.data.results

    })
  }

  search(value: String) {

    this.term = value;
  }

  findTrending() {

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }




}