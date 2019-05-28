import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ComponentsDataService {
  dataComp$ = new Subject();
  subject = new Subject();
  sideMenuVisibility = false;
  dataList;

  setData(dataList): void {
    this.dataComp$.next(dataList);
  }

  getData() {
    this.dataComp$.pipe(take(1)).subscribe(data => this.dataList = data);
  }

  ToggleVisibility() {
    this.sideMenuVisibility = !this.sideMenuVisibility;
    this.subject.next(this.sideMenuVisibility);
  }

}
