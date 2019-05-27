import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComponentsDataService {
  dataComp$ = new Subject();
  subject = new Subject();
  sideMenuVisibility;
  dataList;

  setData(dataList): void {
    this.dataComp$.next(dataList);
  }

  getData() {
    this.dataComp$.subscribe(data => this.dataList = data);
  }

  ToggleVisibility() {
    this.sideMenuVisibility = !this.sideMenuVisibility;
    this.subject.next(this.sideMenuVisibility);
  }

}
