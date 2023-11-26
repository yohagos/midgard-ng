import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  currentUser: User = {
    firstname: '',
    id: 0,
    lastname: '',
    email: '',
    password: '',
    createdAt: undefined,
    accessToken: '',
    refreshToken: ''
  }

  constructor(
    private userService: UserService
  ) {
    this.userService.getUser().subscribe(
      user => {
        this.currentUser = user;
        console.log(this.currentUser)
      }
    )
   }

}
