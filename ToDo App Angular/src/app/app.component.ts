import { Component } from '@angular/core';
import { DataService } from './data.service';
import { DataComponent } from './data.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'To Do App';
}
