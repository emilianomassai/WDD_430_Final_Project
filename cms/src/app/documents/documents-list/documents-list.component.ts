import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Document } from '../documents.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit, OnDestroy {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();


  documents: Document[] = [];

  private subscription!: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    // TO DELETE THE FOLLOWING LINE WHEN READY TO USE FIREBASE
    // this.documents = this.documentService.getDocuments();

    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    )

    // USE THE FOLLOWING TO GET DOCUMENTS FROM FIREBASE
    this.documentService.getDocuments();
  }


  // TO CHANGE THIS WITH REAL DATA
  // this function is add a new document using hard coded details
  onAdd() {

    // fake add document 
    // let testDocument = new Document(this.documentService.getMaxId().toString(), 'The Book of Mormon', 'Another Testament of Jesus Christ', 'https://www.churchofjesuschrist.org/study/scriptures/bofm?lang=eng', 'child')
    // this.documentService.addDocument(testDocument);

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
