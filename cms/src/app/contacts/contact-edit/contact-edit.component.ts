import { Component, OnInit } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  validContact!: boolean;

  contact!: Contact;
  originalContact!: Contact;

  groupContacts: Contact[] = [];

  editMode: boolean = false;
  hasGroup: boolean = false;
  invalidGroupContact!: boolean;


  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: Params) => {

    //     const id = params['id'];


    //     if (!id) {

    //       this.editMode = false;
    //       return;
    //     }



    //     this.originalContact = this.contactService.getContact(id);


    //     if (!this.originalContact) {

    //       return;
    //     }


    //     this.editMode = true;

    //     this.contact = JSON.parse(JSON.stringify(this.originalContact));


    //     // if (this.contact.group !== null && this.contact.group !== undefined) {

    //     //   this.hasGroup = true;



    //     //   this.groupContacts = [...this.contact.group];
    //     // }
    //   }
    // )
  }

  onCancel() {
    this.router.navigate(['/contacts'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {

    // const values = form.value;


    // const newContact = new Contact('', values.name, values.email, values.phone, values.imageUrl, this.groupContacts);


    // if (this.editMode === true) {

    //   this.contactService.updateContact(this.originalContact, newContact);
    // } else {

    //   this.contactService.addContact(newContact);
    // }


    this.router.navigate(['/contacts'], { relativeTo: this.route });
  }


  isInvalidContact(newContact: Contact) {

    // if (!newContact) {

    //   return true;
    // }



    // if (newContact.id === this.contact.id) {

    //   return true;
    // }


    // for (let i = 0; i < this.groupContacts.length; i++) {

    //   if (newContact.id === this.groupContacts[i].id) {

    //     return true;
    //   }
    // }


    // return false;
  }


  addToGroup($event: any) {

    // const selectedContact: Contact = $event.dragData;

    // this.invalidGroupContact = this.isInvalidContact(selectedContact);

    // if (this.invalidGroupContact) {

    //   console.log('Not valid!')
    //   return;
    // }

    // this.groupContacts.push(selectedContact);

    // this.invalidGroupContact = false;
  }


  onRemoveItem(id: number) {

    // if (id < 0 || id >= this.groupContacts.length) {

    //   return;
    // }


    // this.groupContacts.splice(id, 1);

    // this.invalidGroupContact = false;
  }

}