import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messageListChangedEvent = new Subject<Message[]>();
  messages: Message[] = [];

  maxMessageId!: number;

  constructor(private http: HttpClient, private contactService: ContactService) {
    this.contactService.getContacts();


    this.getMessages();

  }

  getMessages() {
    // this.http.get<Message[]>('https://cms-wdd430-58d60-default-rtdb.firebaseio.com/messages.json')
    // this.http.get<Message[]>('http://localhost:3000/messages')

    this.http.get<{ message: string; messages: Message[] }>('http://127.0.0.1:3000/messages')
      .subscribe(
        (messagesData) => {
          this.messages = messagesData.messages;
          this.maxMessageId = this.getMaxId();
          console.log(messagesData.messages)

          // this.messages.sort((a, b) => (a.id < b.id) ? 1 : (a.id > b.id) ? -1 : 0)
          this.messageListChangedEvent.next(this.messages.slice());

          (error: any) => {
            console.log(error);
          }
        })
  }

  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null!;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addMessage(newMessage: Message) {
    // this.messages.push(message);
    // this.storeMessages();
    if (!newMessage) {
      //exit
      return;
    }

    //set headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    //convert object to string to send on request
    newMessage.id = '';
    const strMessage = JSON.stringify(newMessage);

    //send request with object and headers
    this.http.post('http://127.0.0.1:3000/messages/', strMessage, { headers: headers })
      //subscribe to response
      .subscribe(
        () => {

          //emit change
          this.messageListChangedEvent.next(this.messages.slice());
        });
  }

  storeMessages() {
    let messages = JSON.stringify(this.messages);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('http://127.0.0.1:3000/messages/', messages, { headers: headers })
      .subscribe(
        () => {

          this.messageListChangedEvent.next(this.messages.slice());
        }
      )
  }
}

