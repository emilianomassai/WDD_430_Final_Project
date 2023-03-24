import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Movie } from '../movies.model';
import { WindRefService } from 'src/app/wind-ref.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies-detail',
  templateUrl: './movies-detail.component.html',
  styleUrls: ['./movies-detail.component.css']
})
export class MoviesDetailComponent implements OnInit, OnDestroy {

  movie!: Movie;
  id!: string;
  nativeWindow: any;
  subscription!: Subscription;

  constructor(
    private movieService: MovieService,
    private windowRefService: WindRefService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.movie = this.movieService.getMovie(this.id);

        if (this.movie == null) {
          this.subscription = this.movieService.movieListChangedEvent.subscribe(() => {
            this.movie = this.movieService.getMovie(params['id'])
          }
          )
        }
      })

    this.nativeWindow = this.windowRefService.getNativeWindow();


  }


  onDelete() {
    this.movieService.deleteMovie(this.movie);
    this.router.navigate(['/movies'], { relativeTo: this.route });
  }


  // TO CHANGE THIS WITH REAL DATA
  onEdit() {

  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
