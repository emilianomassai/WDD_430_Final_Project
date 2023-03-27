import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';

import { ContactsComponent } from './contacts/contacts.component';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { MoviesDetailComponent } from './movies/movies-detail/movies-detail.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
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
  {
    path: 'contacts', component: ContactsComponent, children: [
      { path: 'new', component: ContactEditComponent },
      { path: ':id', component: ContactDetailComponent },
      { path: ':id/edit', component: ContactEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
