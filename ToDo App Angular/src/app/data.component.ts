import {Component, OnInit} from '@angular/core';
import {template} from '@angular/core/src/render3';
import {Note} from './note';
import {DataService} from './data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'data-comp',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {
  dateNow = String(new Date());
  check = false;
  items: Note[] = [];
  addDataForm: FormGroup;
  constructor(private dataService: DataService) {
    this.addDataForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      desc: new FormControl('', Validators.required)
    });
  }

  checkBoxToggle(item) {
    item['check'] = !item['check'];
  }

  deleteItem(item) {
    const index: number = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  addItem(title: string, descr: string, date: string, check: boolean) {
    this.dataService.addData(title, descr, this.dateNow, check);
    this.addDataForm.reset();
  }

  ngOnInit(): void {
    this.items = this.dataService.getData();
  }

}
