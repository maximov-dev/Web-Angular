import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {DataService} from '../services/data.service';
import {Subject, Subscription} from 'rxjs';
import {ComponentsDataService} from '../services/components-data.service';

@Component({
  selector: 'goods-comp',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css'],
  providers: [DataService, ComponentsDataService]
})
export class GoodsComponent implements OnInit, OnDestroy {
  page: number;
  dataList;
  subscription: Subscription;
  modalVisibility: boolean;

  constructor(private http: DataService, private componentDS: ComponentsDataService) {
  }

  ngOnInit(): void {
    this.subscription = this.http.data$.subscribe(data => {
      this.dataList = data;
      this.dataList.forEach((item) => {
        item.checked = false;
      });
    });
    this.componentDS.setData(this.dataList);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  modalToggle(): void {
    this.modalVisibility = !this.modalVisibility;
  }

  checkBoxToggle(item): void {
    console.log(item['checked']);
    item['checked'] = !item['checked'];
    this.componentDS.setData(this.dataList);
    this.componentDS.getData();
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
