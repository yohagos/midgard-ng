import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
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
    {name: 'Tickets', path: '/ticket', loggedIn: true},
    {name: 'Logout', path: '/logout', loggedIn: true},
  ]

  open = true

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
        if (event instanceof NavigationStart && event.url == '/logout') {
          this.jwtService.destroyToken()
          window.location.reload();
        }
      }
    )
  }

  toggleMenu(event: any) {
    if(event) {
      this.open = !this.open
    }
  }
}
