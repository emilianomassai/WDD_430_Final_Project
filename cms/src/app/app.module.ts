import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-list/contact-item/contact-item.component';
import { MoviesComponent } from './movies/movies.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MoviesDetailComponent } from './movies/movies-detail/movies-detail.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MoviesItemComponent } from './movies/movies-list/movies-item/movies-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { DndModule } from 'ng2-dnd';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import { MoviesFilterPipe } from './movies/movies-filter.pipe';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    MoviesComponent,
    MoviesDetailComponent,
    MovieEditComponent,
    MoviesListComponent,
    MoviesItemComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective,
    ContactEditComponent,
    ContactsFilterPipe,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
