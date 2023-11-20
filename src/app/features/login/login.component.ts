import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  hide = true

  fb = inject(FormBuilder)

  loginForm = this.fb.group({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(

  ) {}


  submitForm() {
    console.log(this.loginForm.value)
  }
}
