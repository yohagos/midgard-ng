import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { CommentAddRequest, Comments } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commentSubject = new Subject<void>()

  comment$ = this.commentSubject.asObservable()

  constructor(
    private readonly http: HttpClient
  ) { }

  getCommentsForTicket(ticketId: number) {
    return this.http.get<Comments[]>(`comment/ticket/${ticketId}`)
  }

  submitComment(comment: CommentAddRequest) {
    return this.http.post('comment/add', comment)
  }
}
