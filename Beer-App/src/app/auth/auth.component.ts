import { Component, Input, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {ComponentsDataService} from '../services/components-data.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'auth-comp',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent{
  addUserForm: FormGroup;
  sideMenuVisibility;

  constructor(private ComponentDS: ComponentsDataService) {
    this.addUserForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  sideMenuToggle(): void {
    this.ComponentDS.ToggleVisibility();
  }

  checkAuthFields(): void {
    if (this.addUserForm.controls['userName'].invalid && this.addUserForm.controls['userPassword']){
      alert('Ошибка');
    } else {
      alert('OK');
    }
  }
}
