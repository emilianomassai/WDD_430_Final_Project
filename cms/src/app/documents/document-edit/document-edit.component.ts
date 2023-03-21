import { Component, OnInit, ViewChild } from '@angular/core';
import { Document } from '../documents.model';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument!: Document;
  document!: Document;
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentsService: DocumentService) { }


  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];

        if (!id) {
          this.editMode = false;
          return;
        }

        this.originalDocument = this.documentsService.getDocument(id);

        if (!this.originalDocument) {
          return;
        }

        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )
  }

  onCancel() {
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    const newDocument = new Document('', values.name, values.description, values.trailerUrl, values.image, '');

    if (this.editMode === true) {
      this.documentsService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentsService.addDocument(newDocument);
    }

    this.router.navigate(['/documents'], { relativeTo: this.route });
  }
}