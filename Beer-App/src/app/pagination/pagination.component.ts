import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {ActivatedRoute} from '@angular/router';
import {ComponentsDataService} from '../services/components-data.service';
import { Router} from '@angular/router';

@Component({
  selector: 'my-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  providers: [ComponentsDataService]
})
export class PaginationComponent implements OnInit {
  page: number;
  id: number;

  constructor(private route: ActivatedRoute, private http: DataService, private router: Router) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params !== undefined && params['id'] < 30) {
        this.page = +params['id'];
      } else {
        this.page = 1;
      }

      this.http.page = this.page;
      this.http.getData();
    });

    this.setPageOnDataService();
  }

  showNextPageBtn(): boolean {
    if (this.page >= 1 && this.page !== 30) {
      return true;
    }
  }

  setCurrentPage(page: number): void {
    this.page = page;
  }

  getCurrentPage(): number {
    return this.page;
  }

  setNextPage(): void {
    this.page++;
    this.showNumbersOfPages();
    this.setPageOnDataService();
  }

  setPrevPage(): void {
    this.page--;
    this.showNumbersOfPages();
    this.setPageOnDataService();
  }

  setPageOnDataService(): void {
    this.http.page = this.page;
    this.http.getData();
  }

  showNumbersOfPages(page = this.page) {
    this.setCurrentPage(page);
    //this.router.navigate(['id', this.id], { skipLocationChange: false}) ////////////

    if (page === 1 || page <= 6) {
      return this.createNumbersInPag(1, 10);
    } else {
      return this.createNumbersInPag(page - 5, page + 4);
    }
  }

  createPagArr(page: number, lastPage: number): number[] {
    const pagArr = [];

    for (page; page <= lastPage; page++) {
      pagArr.push(page);
    }
    return pagArr;
  }

  createNumbersInPag(page: number, lastPage: number): number[] {
    const maxNumberInPag = 30;

    if (lastPage > maxNumberInPag) {
      lastPage = maxNumberInPag;
    }

    const pagArr = this.createPagArr(page, lastPage);
    return pagArr;
  }
}
