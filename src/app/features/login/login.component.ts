import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from "rxjs";
import { Errors } from 'src/app/core/models/errors.model';

import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  hide = true
  errors: Errors = {errors: {}}
  isSubmitting = false
  destroy$ = new Subject<void>()

  fb = inject(FormBuilder)

  loginForm: FormGroup;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {
    this.loginForm  = this.fb.group({
      email: ['david@david.david', [Validators.required, Validators.email]],
      password: ['david', [Validators.required]]
    })
  }

  login() {
    let credentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.userService.login(credentials).subscribe({
      next: () => {
        void this.router.navigate(["/profile"])
      },
      error: (err) => {
        this.errors = err;
        this.isSubmitting = false;
      }
    }
    )
  }

}
