import { Component } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import set = Reflect.set;

@Component({
  selector: 'auth-comp',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  addUserForm: FormGroup;

  constructor() {
    this.addUserForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  checkAuthFields() {
    if (this.addUserForm.controls['userName'].invalid && this.addUserForm.controls['userPassword']){
      alert('Ошибка');
    } else {
      alert('OK');
    }
  }
}
