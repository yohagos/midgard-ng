import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { takeUntil, Subject } from "rxjs";
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

  loginForm = this.fb.group({
    email: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    })
  })

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  login() {
    let observable = this.userService.login(
      this.loginForm.value as {email: string, password: string}
    )
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        void this.router.navigate(["/profile"])
      },
      error: (err) => {
        this.errors = err;
        this.isSubmitting = false;
      }
    })
  }

  clickMe() {
    let observable = this.userService.test()
    observable.subscribe(
      (res) => console.log(res)
    )
  }
}
