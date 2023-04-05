import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { TrendingMovieService } from 'src/app/trendingMovies/trendingMovie.service';
import { TrendingMovie } from 'src/app/trendingMovies/trendingMovies.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  messageSender: string = '';

  constructor(private trendingMovieService: TrendingMovieService) {
    this.trendingMovieService.getTrendingMovies();

  }

  ngOnInit() {

  }

}
