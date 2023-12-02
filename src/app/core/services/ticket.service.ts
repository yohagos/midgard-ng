import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { JwtService } from "./jwt.service";
import { TicketCreateRequest } from "../models/ticket.model";


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
    console.log(ticket);
    return this.http.post<TicketCreateRequest>('ticket/add', ticket);
  }
}
