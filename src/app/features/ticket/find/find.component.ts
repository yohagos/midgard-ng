import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Tickets } from 'src/app/core/models/ticket.model';
import { ShareService } from '../shared/share.service';
import { TicketService } from 'src/app/core/services/ticket.service';


@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrl: './find.component.scss'
})
export class FindComponent  {
  ticketsList: Tickets[]

  loading = true

  constructor(
    private router: Router,
    private shareService: ShareService,
    private ticketService: TicketService
  ) {
    this.ticketsList = this.shareService.getTicketList()
    this.ticketService.getAllTickets().subscribe(
      result => {
        this.ticketsList = result
        this.loading = false
      }
    )
   }

  changeColor(ticket: Tickets) {
    let panel = {}
    switch(ticket.status) {
      case 'OPEN':
        panel = {'border-bottom': '1.5px solid #228B22'}
        break;
      case 'IMPLEMENTING':
        panel = {'border-bottom': '1.5px solid #1E90FF'}
        break;
      case 'REVIEWING':
        panel = {'border-bottom': '1.5px solid #8B008B'}
        break;
      case 'CLOSED':
        panel = {'border-bottom': '1.5px solid #696969'}
        break;
      default:
        break;
    }
    return panel
  }

  changeTitleByPriority(ticket: Tickets) {
    let title = {}
    switch(ticket.priority) {
      case 'Low':
        title = {'color': '#97e376'}
        break;
      case 'SEMI_LOW':
        title = {'color': '#c5d663'}
        break;
      case 'MEDIUM':
        title = {'color': '#e0c755'}
        break;
      case 'SEMI_HIGH':
        title = {'color': '#e09255'}
        break;
      case 'HIGH':
        title = {'color': '#e06655'}
        break;
      default:
        break;
    }
    return title
  }

  editTicket(ticket: Tickets) {
    console.log(ticket)

    this.router.navigate(['ticket', {outlets: {ticketOutlet: ['edit']}}], { queryParams: ticket})
  }

}
