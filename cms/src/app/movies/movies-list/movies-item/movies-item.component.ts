import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../movies.model';

@Component({
  selector: 'app-movies-item',
  templateUrl: './movies-item.component.html',
  styleUrls: ['./movies-item.component.css']
})
export class MoviesItemComponent implements OnInit {
  @Input() movie!: Movie;
  @Output() movieSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.movieSelected.emit();
  }
}