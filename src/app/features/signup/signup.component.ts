import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  hide_password = true
  hide_repeat = true

  signupForm: FormGroup;

  constructor(
    public formbuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.signupForm = this.formbuilder.group({
      firstname: ['david', [Validators.required]],
      lastname: ['david', [Validators.required]],
      email: ['david@david.david', [Validators.required, Validators.email]],
      password: ['david', [Validators.required]],
      repeatPassword: ['david', [Validators.required]]
    })
  }

  submitForm() {
    if (this.signupForm.get('password')?.value !== this.signupForm.get('repeatPassword')?.value) {
      this._snackBar.open("Passwords do not match", 'Try again')
      return
    }
    let credentials = {
      firstname: this.signupForm.get('firstname')?.value,
      lastname: this.signupForm.get('lastname')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
    }
    this.userService.register(credentials).subscribe(
      (res) => {
        this.router.navigate(['/login'])
      }
    )
  }
}
