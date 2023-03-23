import { Pipe, PipeTransform } from '@angular/core';
import { Document } from './documents.model';
@Pipe({
  name: 'moviesFilter'
})
export class MoviesFilterPipe implements PipeTransform {

  transform(documents: Document[], term: string) {

    let filteredDocuments: Document[] = [];
    if (term && term.length > 0) {
      filteredDocuments = documents.filter(
        (document: Document) => document.name.toLowerCase().includes(term.toLowerCase()));

    }
    if (filteredDocuments.length < 1) {
      return documents;
    }
    return filteredDocuments;
  }
}