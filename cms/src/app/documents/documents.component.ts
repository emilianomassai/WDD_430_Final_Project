import { Component, OnInit } from '@angular/core';
import { Document } from './documents.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentService]
})
export class DocumentsComponent implements OnInit {
  selectedDocument!: Document;

  constructor() { }

  ngOnInit(): void {
  }

}
