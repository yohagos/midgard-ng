import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  isLoggedIn = false;
  navigations = [
    {name: 'Home', path: '/home', loggedIn: false},
    {name: 'Sign Up', path: '/signup', loggedIn: false},
    {name: 'Log In', path: '/login', loggedIn: false},
    {name: 'Profile', path: '/profile', loggedIn: true},
  ]

  constructor(
    private readonly jwtService: JwtService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          this.isLoggedIn = this.jwtService.getToken() ? true : false
        }
      }
    )
  }

}
