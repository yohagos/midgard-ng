import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Tickets } from 'src/app/core/models/ticket.model';
import { TicketService } from 'src/app/core/services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
  ticketsList!: Tickets[]

  constructor(
    private readonly ticketService: TicketService
  ) {
    this.loadTickets()
  }


  loadTickets() {
    this.ticketService.getAllTickets().subscribe(
      result => {
        this.ticketsList = result
      }
    )
  }

  onTabChanged(event: MatTabChangeEvent) {
    this.loadTickets()
  }

}
