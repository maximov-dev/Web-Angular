import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable()
export class DataService {
  page: number;
  data$ = new Subject();

  constructor(private http: HttpClient) { }

  getData(): void {
  this.http.get(`https://api.punkapi.com/v2/beers?per_page=8&page=${this.page}`).pipe(take(1)).subscribe(data => this.data$.next(data));
  }
}
