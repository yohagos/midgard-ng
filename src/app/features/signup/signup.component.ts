import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  hide = true

  signupForm = this.formbuilder.group({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl('')
  })

  constructor(
    public formbuilder: FormBuilder
  ) {}

  submitForm() {
    console.table(this.signupForm.value)
  }
}
