import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Note } from '../Note';
import { DataService} from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'goods-comp',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css'],
  providers: [DataService]
})
export class GoodsComponent implements OnInit, OnDestroy {
  note: Note[] = [];
  page: number;
  dataList;
  modalVisibility: boolean = false;
  subscription: Subscription;

  constructor(private http: DataService) {
  }

  ngOnInit(): void {
    this.subscription = this.http.getData().subscribe(data => {
      this.dataList = data;
      this.dataList.map((item) => {
        item.checked = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sortByABV() {
    this.dataList.sort((elmA, elmB) => {
    return +elmA['abv'] - +elmB['abv'];
  });
  }

  sortByName() {
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

  modalToggle(): void {
    this.modalVisibility = !this.modalVisibility;
  }

  checkBoxToggle(item): void {
    item['checked'] = !item['checked'];
  }

}
