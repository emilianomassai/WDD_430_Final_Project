import { EventEmitter, Injectable } from '@angular/core';
// import { MOCKCONTACTS } from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './contacts.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactChangedEvent = new EventEmitter<Contact[]>();

  contactListChangedEvent = new Subject<Contact[]>();

  maxContactId: number;
  public data: any = [];
  public topRated: any = [];

  private contacts: Contact[] = [];

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    // this.getContacts();
    this.maxContactId = this.getMaxId();
  }


  findTrending() {
    return this.http.get('https://api.themoviedb.org/3/trending/all/day?api_key=f4ec058abc3d746728270f736f4851fd');

  }

  getContacts() {

    // // this.http.get<Contact[]>('https://cms-wdd430-58d60-default-rtdb.firebaseio.com/contacts.json')
    // this.http.get<{ message: string; contacts: Contact[] }>('http://127.0.0.1:4200/contacts')
    //   .subscribe(
    //     (contactsData) => {
    //       this.contacts = contactsData.contacts;
    //       this.maxContactId = this.getMaxId();
    //       console.log(contactsData.contacts)

    //       // this.contacts.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0);
    //       this.contactListChangedEvent.next(this.contacts.slice());

    //       (error: any) => {
    //         console.log(error);
    //       }
    //     })
  }

  // getContacts(): Contact[] { return this.contacts.slice(); }


  getContact(id: string): Contact {
    // const url = 'https://api.themoviedb.org/3/'
    // const apiKey = 'f4ec058abc3d746728270f736f4851fd'
    // console.log("`${url}contact/${id}?api_key=${apiKey}`" + `${url}movie/${id}?api_key=${apiKey}`)

    // return this.http.get(`${url}movie/${id}?api_key=${apiKey}`);


    // const url = 'https://api.themoviedb.org/3/trending/all/day?api_key=f4ec058abc3d746728270f736f4851fd'
    // this.http.get(url).subscribe((res) => {
    //   this.data = res
    //   this.topRated = this.data.results


    //   for (let i = 0; i < this.topRated.length; i++) {
    //     if (this.topRated[i].id == id) {

    //       console.log("Movie selected")
    //       console.log("Id: " + this.topRated[i].id)
    //       console.log("Title: " + this.topRated[i].title)
    //       console.log("Overview: " + this.topRated[i].overview)
    //       console.log("Poster: " + this.topRated[i].poster_path)
    //       console.log("Vote: " + this.topRated[i].vote_average)
    //       console.log("Release: " + this.topRated[i].release_date)

    //       console.log('topRated[i]' + this.topRated[i])
    //       return this.topRated[i];
    //     }
    //   }
    // })

    return null!;

  }

  // getContact(id: string): Contact {

  //   const url = 'https://api.themoviedb.org/3/trending/all/day?api_key=f4ec058abc3d746728270f736f4851fd'
  //   this.http.get(url).subscribe((res) => {
  //     this.data = res
  //     this.topRated = this.data.results


  //     for (let i = 0; i < this.topRated.length; i++) {
  //       if (this.topRated[i].id == id) {

  //         console.log("Movie selected")
  //         console.log("Id: " + this.topRated[i].id)
  //         console.log("Title: " + this.topRated[i].title)
  //         console.log("Overview: " + this.topRated[i].overview)
  //         console.log("Poster: " + this.topRated[i].poster_path)
  //         console.log("Vote: " + this.topRated[i].vote_average)
  //         console.log("Release: " + this.topRated[i].release_date)

  //         return this.topRated[i];
  //       }
  //     }
  //   })

  //   return null!;

  // }


  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact === null || newContact === undefined) {
      return;
    }

    // this.maxContactId++;
    // newContact.id = this.maxContactId.toString();
    // this.contacts.push(newContact);
    // this.storeContacts();


    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    newContact.id = '';
    const strContact = JSON.stringify(newContact);

    this.http.post('http://127.0.0.1:4200/contacts/', strContact, { headers: headers })
      .subscribe(
        () => {
          this.contactChangedEvent.next(this.contacts.slice());
        });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);

    // const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;

    // newContact.id = originalContact.id;
    // this.contacts[pos] = newContact;
    // this.storeContacts();
    //set headers
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // const strContact = JSON.stringify(newContact);

    this.http.patch('http://127.0.0.1:4200/contacts/' + originalContact.id
      , newContact, { headers: headers })
      .subscribe(
        () => {
          this.contacts[pos] = newContact;
          this.contactListChangedEvent.next(this.contacts.slice());
        });
  }

  deleteContact(contact: Contact) {
    // if (contact === null || contact === undefined) {
    //   return;
    // }
    // const pos = this.contacts.indexOf(contact);

    // if (pos < 0) {
    //   return;
    // }
    // // this.contacts.splice(pos, 1);
    // // this.storeContacts();
    // this.http.delete('http://127.0.0.1:4200/contacts/' + contact.id)
    //   .subscribe(
    //     () => {
    //       this.contactListChangedEvent.next(this.contacts.slice());
    //     });

  }

  storeContacts() {
    let contacts = JSON.stringify(this.contacts);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('https://api.themoviedb.org/3/trending/all/day?api_key=f4ec058abc3d746728270f736f4851fd', contacts, { headers: headers })
      .subscribe(
        () => {
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      )
  }

}