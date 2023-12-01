import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  selectedUsers!: User[]

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User[]
  ) { }

  submit() {
    this.dialogRef.close(this.selectedUsers)
  }

  cancel() {
    this.selectedUsers = []
    this.dialogRef.close()
  }

}
