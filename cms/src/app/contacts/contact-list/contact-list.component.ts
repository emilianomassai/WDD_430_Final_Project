import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  term: String = '';
  data: any = []
  topRated: any;

  contacts: Contact[] = []


  private subscription!: Subscription;


  constructor(private contactService: ContactService, private http: HttpClient, public sanitizer: DomSanitizer
  ) {

  }

  ngOnInit(): void {

    this.subscription = this.contactService.contactListChangedEvent
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });


    this.contactService.getContacts();
    this.contactService.findTrending();
    this.getData();


  }
  getData() {
    const url = 'https://api.themoviedb.org/3/trending/all/day?api_key=f4ec058abc3d746728270f736f4851fd'
    this.http.get(url).subscribe((res) => {
      this.data = res
      this.topRated = this.data.results
      // TODO !!!
      // here is the list of movies .. needs to use this to display the movies on the page
      // console.log("poster: " + this.data.results[0].poster_path)
      // console.log(this.data.results[0].title)
    })
  }

  search(value: String) {

    this.term = value;
  }

  findTrending() {

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }




}