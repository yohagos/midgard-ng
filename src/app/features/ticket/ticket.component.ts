import { Component } from '@angular/core';
import { TicketService } from 'src/app/core/services/ticket.service';
import { ShareService } from './shared/share.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
  constructor(
    private readonly ticketService: TicketService,
    private shareService: ShareService
  ) {
    this.ticketService.getAllTickets().subscribe(
      result => {
        this.shareService.setTicketList(result)
      }
    )
  }
}
