import { Component, OnInit } from '@angular/core';
import { TrendingMovie } from '../trendingMovies.model';
import { TrendingMovieService } from '../trendingMovie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-trendingMovie-edit',
  templateUrl: './trendingMovie-edit.component.html',
  styleUrls: ['./trendingMovie-edit.component.css']
})
export class TrendingMovieEditComponent implements OnInit {
  validTrendingMovie!: boolean;

  trendingMovie!: TrendingMovie;
  originalTrendingMovie!: TrendingMovie;

  groupTrendingMovies: TrendingMovie[] = [];

  editMode: boolean = false;
  hasGroup: boolean = false;
  invalidGroupTrendingMovie!: boolean;


  constructor(private TrendingMovieService: TrendingMovieService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  onCancel() {
    this.router.navigate(['/trendingMovies'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {



    this.router.navigate(['/trendingMovies'], { relativeTo: this.route });
  }


  isInvalidTrendingMovie(newTrendingMovie: TrendingMovie) {

  }


  addToGroup($event: any) {

  }


  onRemoveItem(id: number) {

  }

}