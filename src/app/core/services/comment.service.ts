import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comments } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getCommentsForTicket(ticketId: number) {
    return this.http.get<Comments[]>(`comment/ticket/${ticketId}`)
  }
}
