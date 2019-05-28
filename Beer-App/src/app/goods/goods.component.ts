import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {DataService} from '../services/data.service';
import {Subject, Subscription} from 'rxjs';
import {ComponentsDataService} from '../services/components-data.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'goods-comp',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css'],
  providers: [DataService]
})
export class GoodsComponent implements OnInit, OnDestroy {
  private componentDestroyed$ = new Subject();
  sideMenuVisibility;
  page: number;
  dataList;
  modalVisibility;

  constructor(private http: DataService, private componentDS: ComponentsDataService) {
  }

  ngOnInit(): void {
    this.componentDS.subject.pipe(takeUntil(this.componentDestroyed$)).subscribe(toggle => this.sideMenuVisibility = toggle);

    this.componentDS.dataComp$.pipe(takeUntil(this.componentDestroyed$)).subscribe(data => this.dataList = data);

    this.http.data$.pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.dataList = data;
      this.dataList.forEach((item) => {
        item.checked = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  modalToggle(): void {
    this.modalVisibility = !this.modalVisibility;
  }

  sideMenuToggle(): void {
    this.componentDS.ToggleVisibility();
  }

  checkBoxToggle(item): void {
    console.log(item['checked']);
    item['checked'] = !item['checked'];
    this.componentDS.setData(this.dataList);
  }

  sortByABV(): void {
    this.dataList.sort((elmA, elmB) => {
      return +elmA['abv'] - +elmB['abv'];
    });
  }

  sortByName(): void {
    return this.dataList.sort((elmA, elmB) => {
      const titleA = elmA['name'].toLowerCase();
      const titleB = elmB['name'].toLowerCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
  }

}
