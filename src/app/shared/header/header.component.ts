import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Output, Renderer2, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'Midgard'

  @Output() toggleMenu = new EventEmitter()

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {  }

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
