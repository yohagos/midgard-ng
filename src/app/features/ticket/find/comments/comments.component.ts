import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Comments } from 'src/app/core/models/comment.model';
import { Tickets } from 'src/app/core/models/ticket.model';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  comments: Comments[] = []
  title = ''

  constructor(
    public commentsDialog: MatDialogRef<CommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { allComments: Comments[], title: string }
  ) {
    this.title = data.title
    if (data.allComments) {
      this.comments = data.allComments
    }
  }

  submit() {
    console.log('submit')
  }

  cancel() {
    console.log('cancel')
  }

}
