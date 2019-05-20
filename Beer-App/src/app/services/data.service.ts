import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Note } from '../Note';

@Injectable()
export class DataService {
  page: number = 1;

  constructor(private http: HttpClient) { }

  getData(): Observable<Note[]> {
    console.log(this.page);
  return this.http.get(`https://api.punkapi.com/v2/beers?per_page=8&page=${this.page}`).pipe(map(data => {
  let dataList = data;
  return dataList.map(function(note: any) {
    return {name: note.name, description: note.description, image_url: note.image_url, abv: note.abv};
  });
}));
}

}
