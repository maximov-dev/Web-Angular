import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {ActivatedRoute} from '@angular/router';
import {ComponentsDataService} from '../services/components-data.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'my-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  providers: [ComponentsDataService]
})
export class PaginationComponent implements OnInit, OnDestroy {
  page: number;
  componentDestroyed$ = new Subject();

  constructor(private route: ActivatedRoute, private http: DataService) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {

      if (params['id'] >= 1 && params['id'] <= 30) {
        this.page = +params['id'];
      } else {
        this.page = 1;
      }

      this.http.page = this.page;
      this.http.getData();
    });

    this.setPageOnDataService();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onIdChange(page) {
    window.history.replaceState({}, '',`/home?id=${page}`);
  }

  showNextPageBtn(): boolean {
    if (this.page >= 1 && this.page < 30) {
      return true;
    }
  }

  setCurrentPage(page: number): void {
    this.onIdChange(this.page);
    this.page = page;
  }

  getCurrentPage(): number {
    return this.page;
  }

  setNextPage(): void {
    this.page++;
    this.onIdChange(this.page);
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
