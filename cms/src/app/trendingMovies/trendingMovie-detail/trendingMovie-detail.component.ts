import { Component, Input, OnInit } from '@angular/core';
import { TrendingMovie } from '../trendingMovies.model';
import { TrendingMovieService } from '../trendingMovie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-trendingMovie-detail',
  templateUrl: './trendingMovie-detail.component.html',
  styleUrls: ['./trendingMovie-detail.component.css']
})
export class TrendingMovieDetailComponent implements OnInit {
  trendingMovie!: TrendingMovie;
  subscription!: Subscription;
  data: any = [];
  topRated: any;
  id: any;

  constructor(private trendingMovieService: TrendingMovieService, private router: Router, private route: ActivatedRoute, public sanitizer: DomSanitizer, private http: HttpClient) {
  }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];

        const url = 'https://api.themoviedb.org/3/trending/all/day?api_key=f4ec058abc3d746728270f736f4851fd'

        // const startUrl = 'https://api.themoviedb.org/3/movie/'
        // const api_Key = 'f4ec058abc3d746728270f736f4851fd'
        // const url = startUrl + this.id + '?api_key=' + api_Key

        console.log('Url ' + url)
        this.http.get(url).subscribe((res) => {
          this.data = res
          this.topRated = this.data.results

          console.log('response ' + this.data.results)
          for (let i = 0; i < this.topRated.length; i++) {
            if (this.topRated[i].id == this.id) {

              console.log("Movie selected")
              console.log("Id: " + this.topRated[i].id)
              console.log("Title: " + this.topRated[i].title)
              console.log("Overview: " + this.topRated[i].overview)
              console.log("Poster: " + this.topRated[i].poster_path)
              console.log("Vote: " + this.topRated[i].vote_average)
              console.log("Release: " + this.topRated[i].release_date)
              console.log("homepage: " + this.topRated[i].homepage)

              this.trendingMovie = this.topRated[i];

            }
          }
        })


        if (this.trendingMovie == null) {
          this.subscription = this.trendingMovieService.trendingMovieListChangedEvent.subscribe(() => {
          }
          )
        }
      })

  }



  onDelete() {
    this.trendingMovieService.deleteTrendingMovie(this.trendingMovie);

    this.router.navigateByUrl('/trendingMovies');
  }


  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}