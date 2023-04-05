import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TrendingMovie } from '../../trendingMovies.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-trendingMovie-item',
  templateUrl: './trendingMovie-item.component.html',
  styleUrls: ['./trendingMovie-item.component.css']
})
export class TrendingMovieItemComponent {
  @Input() trendingMovie!: TrendingMovie;
  @Output() trendingMovieSelected = new EventEmitter<void>();

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  onSelected() {
    this.trendingMovieSelected.emit();
  }

}
