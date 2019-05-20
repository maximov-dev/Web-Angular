import { Component, Input, EventEmitter, Output } from '@angular/core';
import {DataService} from '../services/data.service';
import {GoodsComponent} from '../goods/goods.component';

@Component({
  selector: 'my-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  page: number = 1;
  count: number;
  loading: boolean;

  constructor(private http: DataService) {

  }

  showNumbersOfPages(page = this.page) {
    this.page = page;

    this.http.page = page;
    this.http.getData();

    //updateUrl(page);

    if (page === 1 || page <= 6) {
      return this.createNumbersInPag(1, 10);
    } else {
      return this.createNumbersInPag(page - 5, page + 4);
    }
  }

  createPagArr(page, lastPage) {
    const pagArr = [];

    for (page; page <= lastPage; page++) {
      pagArr.push(page);
    }
    return pagArr;
  }

  createNumbersInPag(page, lastPage) {
    const maxNumberInPag = 30;

    if (lastPage > maxNumberInPag) {
      lastPage = maxNumberInPag;
    }
    const pagArr = this.createPagArr(page, lastPage);
    return pagArr;
  }
}
