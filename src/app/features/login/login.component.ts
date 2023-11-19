import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { LoginForm } from './login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    { provide: MatFormFieldControl, useExisting: LoginComponent }
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('email')
  emailInput!: string
  @ViewChild('password')
  passwordInput!: string

  fb = inject(FormBuilder)

  loginForm = this.fb.group<LoginForm>({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(

  ) {}

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  click() {
    
  }
}
