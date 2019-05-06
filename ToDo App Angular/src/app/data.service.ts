import { Injectable } from '@angular/core';
import { Note} from './note';
import { DataComponent} from './data.component';


@Injectable()
export class DataService {
  private data: Note[] = [
    { title: 'Angular', descr: 'Дочитать оставшиеся главы', date: '5.4.2015', check: false }
  ];

  getData(): Note[] {
    return this.data;
  }

  addData(title: string, descr: string, date: string, check: boolean) {
    this.data.push(new Note(title, descr, date, check));
  }

}
