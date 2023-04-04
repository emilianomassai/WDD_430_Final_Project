import { Component, OnInit } from '@angular/core';
import { Contact } from './contacts.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]

})
export class ContactsComponent implements OnInit {
  selectedContact!: Contact;
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.contactChangedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    })


    this.contactService.findTrending().subscribe(response => {

    }, error => {

    });
  }


}
