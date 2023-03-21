import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  term: String = '';


  contacts: Contact[] = []


  private subscription!: Subscription;


  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {

    this.subscription = this.contactService.contactListChangedEvent
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });


    this.contactService.getContacts();
  }




  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  search(value: String) {

    this.term = value;
  }

}