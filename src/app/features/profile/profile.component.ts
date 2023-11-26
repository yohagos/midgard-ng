import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  currentUser!: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    /* this.userService.getUser().subscribe(
      user => {
        console.log(user);
      }
    ) */
  }

}
