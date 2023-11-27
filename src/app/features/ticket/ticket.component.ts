import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
  links = [
    {
      name: 'Find Tickets',
      link: '/ticket/find'
    },
    {
      name: 'Create Tickets',
      link: '/ticket/find'
    },
    {
      name: 'Edit Tickets',
      link: '/ticket/find'
    },
  ]

  oldlinks = ['/find', '/create', 'edit']
  activeLink = this.links[0]?.link


  click(test: string) {
    console.log(test)
  }
}
