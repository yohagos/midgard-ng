import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Midgard'
  menuList: string[] = ['Home', 'Sign Up', 'Log In', 'Profile']

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.renderer.addClass(this.document.body, 'lightTheme')
  }

  changeTheme() {
    if(this.document.body.classList.contains('lightTheme')) {
      this.renderer.removeClass(this.document.body, 'lightTheme');
      this.renderer.addClass(this.document.body, 'darkTheme')
    } else if (this.document.body.classList.contains('darkTheme')) {
      this.renderer.removeClass(this.document.body, 'darkTheme')
      this.renderer.addClass(this.document.body, 'lightTheme');
    }
  }

  changeTo(page: string) {
    switch (page) {
      case 'Home':
        this.router.navigate(['/'])
        break
      case 'Log In':
        this.router.navigate(['/login'])
        break
      case 'Sign Up':
        this.router.navigate(['/signup'])
        break
      default:
        console.log("No such page")
        break
    }
  }
}
