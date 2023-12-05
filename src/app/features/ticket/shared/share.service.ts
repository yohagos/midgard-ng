import { Injectable } from "@angular/core";
import { Tickets } from "src/app/core/models/ticket.model";


@Injectable({
  providedIn: 'root'
})
export class ShareService {
  ticketList!: Tickets[]

  setTicketList(tickets: Tickets[]) {
    this.ticketList = tickets;
  }

  getTicketList() {
    return this.ticketList
  }
}
