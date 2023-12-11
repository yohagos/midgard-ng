import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { CommentAddRequest, CommentEditRequest, Comments } from '../models/comment.model';

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

  editComment(body: CommentEditRequest) {
    return this.http.put('comment/edit', body)
  }

  deleteComment(id: number) {
    return this.http.delete(`comment/delete/${id}`)
  }
}
