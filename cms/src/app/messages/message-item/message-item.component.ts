import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contacts.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  messageSender: string = '';

  constructor(private contactService: ContactService) {
    this.contactService.getContacts();

  }

  ngOnInit() {
    // let contact: Contact = this.contactService.getContact(this.message.sender);

    // this.messageSender = contact ? contact.title : 'Contact not found';
    // // this.messageSender = contact.name;
    // console.log("Contact sender: " + this.messageSender)
  }

}
