import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private maxDocumentId!: number;
  startedEditing = new Subject<number>();


  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();

  private documents: Document[] = [];

  constructor(private http: HttpClient) {

    // this.documents = MOCKDOCUMENTS
    this.maxDocumentId = this.getMaxId();

  }



  getDocuments() {

    // I need to use this without the error check to avoid my subscription to get deprecated.
    // this.http.get<Document[]>('https://cms-wdd430-58d60-default-rtdb.firebaseio.com/documents.json')


    this.http.get<{ message: string; documents: Document[] }>('http://127.0.0.1:4200/documents')
      .subscribe(
        (documentsData) => {
          this.documents = documentsData.documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0);

          console.log(documentsData)

          this.documentListChangedEvent.next(this.documents.slice());
          (error: any) => {
            console.log(error);
          }
        })
  }

  // getDocuments(): Document[] { return this.documents.slice(); }


  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id == id) {
        return document;
      }
    }
    return null!;
  }


  getMaxId(): number {

    let maxId = 1
    let currentId = 0;
    for (const document of this.documents) {
      currentId == parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId
      }
      console.log('getMaxId is working on Documents')
    }
    return maxId
  }

  // deleteDocument(document: Document) {
  //   if (document === null || document === undefined) {
  //     return;
  //   }
  //   const pos = this.documents.indexOf(document);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.documents.splice(pos, 1);
  //   this.storeDocuments();
  // }

  sortAndSend() {
    this.documents.sort((a, b) => a.name < b.name ? -1 : 0);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://127.0.0.1:4200/documents/' + document.id)
      .subscribe(
        () => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  // addDocument(newDocument: Document) {

  //   if (newDocument === null || newDocument === undefined) {

  //     return;
  //   }

  //   this.maxDocumentId++;
  //   newDocument.id = this.maxDocumentId.toString();
  //   this.documents.push(newDocument);
  //   this.storeDocuments();
  // }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http.post<{ message: string, document: Document }>('http://127.0.0.1:4200/documents/',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  // updateDocument(originalDocument: Document, newDocument: Document) {

  //   if (originalDocument === null || originalDocument === undefined || newDocument === null || newDocument === undefined) {
  //     return;
  //   }

  //   const pos = this.documents.indexOf(originalDocument)
  //   if (pos < 0) {
  //     return
  //   }
  //   newDocument.id = originalDocument.id
  //   this.documents[pos] = newDocument
  //   this.storeDocuments();

  // }


  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http.put('http://127.0.0.1:4200/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        () => {
          this.documents[pos] = newDocument;
          this.documents.sort((a, b) => a.name < b.name ? -1 : 0);
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }


  storeDocuments() {
    let documents = JSON.stringify(this.documents);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // this.http.put('https://cms-wdd430-58d60-default-rtdb.firebaseio.com/documents.json', documents, { headers: headers })

    this.http.put('http://127.0.0.1:4200/documents/', documents, { headers: headers })
      .subscribe(
        () => {

          this.documentListChangedEvent.next(this.documents.slice());
        }
      )
  }
}