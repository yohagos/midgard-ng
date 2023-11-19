import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Midgard'
  menuList: string[] = ['Sign In', 'Log In', 'Impressum']

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
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
}
