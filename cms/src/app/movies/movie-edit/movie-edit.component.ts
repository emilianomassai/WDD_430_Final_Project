import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../movies.model';
import { NgForm } from '@angular/forms';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  originalMovie!: Movie;
  movie!: Movie;
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService) { }


  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];

        if (!id) {
          this.editMode = false;
          return;
        }

        this.originalMovie = this.movieService.getMovie(id);

        if (!this.originalMovie) {
          return;
        }

        this.editMode = true;
        this.movie = JSON.parse(JSON.stringify(this.originalMovie));
      }
    )
  }

  onCancel() {
    this.router.navigate(['/movies'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    const newMovie = new Movie('', values.name, values.description, values.trailerUrl, values.image, '');

    if (this.editMode === true) {
      this.movieService.updateMovie(this.originalMovie, newMovie);
    } else {
      this.movieService.addMovie(newMovie);
    }

    this.router.navigate(['/movies'], { relativeTo: this.route });
  }
}