import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';

import { TrendingMoviesComponent } from './trendingMovies/trendingMovies.component';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { MoviesDetailComponent } from './movies/movies-detail/movies-detail.component';
import { TrendingMovieDetailComponent } from './trendingMovies/trendingMovie-detail/trendingMovie-detail.component';
import { TrendingMovieEditComponent } from './trendingMovies/trendingMovie-edit/trendingMovie-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },

  {
    path: 'movies', component: MoviesComponent, children: [

      { path: 'new', component: MovieEditComponent },
      { path: ':id', component: MoviesDetailComponent },
      { path: ':id/edit', component: MovieEditComponent }

    ]
  },
  { path: 'messages', component: MessageListComponent },

  { path: '', redirectTo: '/trendingMovies', pathMatch: 'full' },

  {
    path: 'trendingMovies', component: TrendingMoviesComponent, children: [

      { path: 'new', component: TrendingMovieEditComponent },
      { path: ':id', component: TrendingMovieDetailComponent },
      { path: ':id/edit', component: TrendingMovieEditComponent }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
