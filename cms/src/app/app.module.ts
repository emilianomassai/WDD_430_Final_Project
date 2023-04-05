import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TrendingMoviesComponent } from './trendingMovies/trendingMovies.component';
import { TrendingMovieListComponent } from './trendingMovies/trendingMovie-list/trendingMovie-list.component';
import { TrendingMovieDetailComponent } from './trendingMovies/trendingMovie-detail/trendingMovie-detail.component';
import { TrendingMovieItemComponent } from './trendingMovies/trendingMovie-list/trendingMovie-item/trendingMovie-item.component';
import { MoviesComponent } from './movies/movies.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MoviesDetailComponent } from './movies/movies-detail/movies-detail.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MoviesItemComponent } from './movies/movies-list/movies-item/movies-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { TrendingMovieEditComponent } from './trendingMovies/trendingMovie-edit/trendingMovie-edit.component';
import { DndModule } from 'ng2-dnd';
import { TrendingMoviesFilterPipe } from './trendingMovies/trendingMovies-filter.pipe';
import { MoviesFilterPipe } from './movies/movies-filter.pipe';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TrendingMoviesComponent,
    TrendingMovieListComponent,
    TrendingMovieDetailComponent,
    TrendingMovieItemComponent,
    MoviesComponent,
    MoviesDetailComponent,
    MovieEditComponent,
    MoviesListComponent,
    MoviesItemComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective,
    TrendingMovieEditComponent,
    TrendingMoviesFilterPipe,
    MoviesFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DndModule.forRoot()


  ],
  providers: [TrendingMovieListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
