import { Component, Input, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Editor } from 'ngx-editor';
import { Subject, takeUntil } from 'rxjs';
import { CommentAddRequest, CommentEditRequest, Comments } from 'src/app/core/models/comment.model';
import { Tickets } from 'src/app/core/models/ticket.model';
import { User } from 'src/app/core/models/user.model';
import { CommentService } from 'src/app/core/services/comment.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit, OnDestroy {
  comments: Comments[] = []
  title = ''
  ticket_id: number
  comment_id!: number

  editor!: Editor
  editorContent = ''
  showEditor = false
  editMode = false
  submitEditedComment = false

  currentUser!: User
  destroy$ = new Subject<void>()

  constructor(
    public commentsDialog: MatDialogRef<CommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { allComments: Comments[], ticket: Tickets, title: string },
    private readonly userService: UserService,
    private readonly commentService: CommentService
  ) {
    this.title = data.title
    this.ticket_id = data.ticket.id
    if (data.allComments) {
      this.comments = data.allComments
    } else {
      this.reloadComments()
    }
    this.userService.getUser().subscribe(
      res => {
        this.currentUser = res
      }
    )
  }

  reloadComments() {
    this.commentService.getCommentsForTicket(this.ticket_id).subscribe(
      res => {
        this.comments = res
      }
    )
  }

  ngOnInit(): void {
    this.editor = new Editor()
    this.commentService.comment$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.reloadComments()
    })
  }

  ngOnDestroy(): void {
    this.editor.destroy()
    this.destroy$.next()
    this.destroy$.complete()
  }

  addComment() {
    this.showEditor = !this.showEditor
  }

  submit() {
    const comment: CommentAddRequest = {
      content: this.editorContent,
      userEmail: this.currentUser?.email,
      ticket_id: this.data.ticket?.id
    }

    this.commentService.submitComment(comment).subscribe(
      () => {
        this.commentService.commentSubject.next()
        this.editorContent = ''
        this.showEditor = false
      }
    )
  }

  editComment(comment: Comments) {
    this.editMode = true
    this.editorContent = comment.content
    this.comment_id = comment.id
    this.showEditor = false
  }

  editCommentCall() {
    let request: CommentEditRequest = {
      comment_id: this.comment_id,
      content: this.editorContent,
      user_email: this.currentUser?.email
    }
    this.editMode = false

    this.commentService.editComment(request).subscribe(
      () => {
        this.reloadComments()
      }
    )
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(
      () => {
        this.reloadComments()
      }
    )
  }
}
