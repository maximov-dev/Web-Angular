import { Component, OnInit } from '@angular/core';
import {template} from '@angular/core/src/render3';
import { Note } from './note';
import { DataService } from './data.service';

@Component({
  selector: 'data-comp',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {
  title: string;
  descr: string;
  date = new Date();
  dateNow = this.date.getDate() + '.' + this.date.getMonth() + '.' + this.date.getFullYear();
  check = false;
  items: Note[] = [];
  constructor(private dataService: DataService) { }

  checkBox(elm) {
    console.log(elm.parentElement.parentElement);
    elm.parentElement.parentElement.outerHTML='';
  }

  addItem(title: string, descr: string, date: string, check: boolean) {
    this.title = '';
    this.descr = '';
    this.dataService.addData(title, descr, this.dateNow, check);
  }

  ngOnInit(): void {
    this.items = this.dataService.getData();
  }

}
