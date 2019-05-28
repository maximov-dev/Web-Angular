import {Component, OnDestroy, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Note} from '../Note';
import {Subject, Subscription} from 'rxjs';
import {ComponentsDataService} from '../services/components-data.service';
import {DataService} from '../services/data.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})

export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalVisibility: boolean;
  @Output() onChanged = new EventEmitter<boolean>();

  dataList;
  componentDestroyed$ = new Subject();

  constructor(private componentDS: ComponentsDataService) {
  }

  ngOnInit(): void {
    this.componentDS.dataComp$.pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.dataList = data;
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  getData() {
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
