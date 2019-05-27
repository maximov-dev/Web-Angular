import {Component, OnDestroy, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Note} from '../Note';
import {Subscription} from 'rxjs';
import {ComponentsDataService} from '../services/components-data.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})

export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalVisibility: boolean;
  @Output() onChanged = new EventEmitter<boolean>();

  dataList;
  subscription: Subscription;

  constructor(private componentDS: ComponentsDataService) {
  }

  ngOnInit(): void {
    this.subscription = this.componentDS.dataComp$.subscribe(data => {
      this.dataList = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getData() {
    // TODO get all checked objects
    console.log(this.dataList)
    return this.dataList;
  }

  modalToggle(): void {
    this.modalVisibility = !this.modalVisibility;
    this.onChanged.emit(this.modalVisibility);
  }

  checkBoxToggle(item): void {
    item['checked'] = !item['checked'];
    this.componentDS.setData(this.dataList);
  }

}
