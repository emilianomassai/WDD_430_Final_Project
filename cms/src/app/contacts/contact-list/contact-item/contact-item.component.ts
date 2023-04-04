import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../contacts.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
  @Input() contact!: Contact;
  @Output() contactSelected = new EventEmitter<void>();

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  onSelected() {
    this.contactSelected.emit();
  }

}
