import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../documents.model';
import { WindRefService } from 'src/app/wind-ref.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-documents-detail',
  templateUrl: './documents-detail.component.html',
  styleUrls: ['./documents-detail.component.css']
})
export class DocumentsDetailComponent implements OnInit, OnDestroy {

  document!: Document;
  id!: string;
  nativeWindow: any;
  subscription!: Subscription;

  constructor(
    private documentService: DocumentService,
    private windowRefService: WindRefService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id);

        if (this.document == null) {
          this.subscription = this.documentService.documentListChangedEvent.subscribe(() => {
            this.document = this.documentService.getDocument(params['id'])
          }
          )
        }
      })

    this.nativeWindow = this.windowRefService.getNativeWindow();


  }

  // onView() {
  //   if (this.document.trailerUrl) {
  //     this.nativeWindow.open(this.document.trailerUrl);
  //   }
  // }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    //route back to the '/documents' URL
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }


  // TO CHANGE THIS WITH REAL DATA
  // this function is updating the existing document with hard coded data 
  onEdit() {
    // fake updated contact 
    // let testDocument = new Document('2', 'The Book of Mormon', 'Another Testament of Jesus Christ', 'https://www.churchofjesuschrist.org/study/scriptures/bofm?lang=eng', 'child')

    // this.documentService.updateDocument(this.document, testDocument);
    // this.router.navigate(['/documents'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
