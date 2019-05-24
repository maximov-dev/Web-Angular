import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class ComponentsDataService {
  dataComp$ = new Subject();
  dataList;

  setData(dataList): void {
    this.dataComp$.next(dataList);
  }

  getData() {
    this.dataComp$.subscribe(data => this.dataList = data);
    console.log(this.dataList);
  }

  setStatusToggle(item) {
    console.log(item['checked']);
    item['checked'] = !item['checked'];
  }

}
