import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { JwtService } from "./jwt.service";
import { TicketCreateRequest, TicketUpdateRequest, Tickets } from "../models/ticket.model";


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly jwtService: JwtService
  ) { }

  getAllTickets() {
    return this.http.get<any>('ticket');
  }

  addNewTicket(ticket: TicketCreateRequest) {
    return this.http.post<TicketCreateRequest>('ticket/add', ticket);
  }

  getTicketById(id: string) {
    return this.http.get<any>(`ticket/${id}`)
  }

  updateTicket(ticket: TicketUpdateRequest) {
    return this.http.put('ticket/update', ticket)
  }
}
