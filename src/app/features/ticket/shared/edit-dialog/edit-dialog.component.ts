import { Component, Inject } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent {
  selectedUser!: User

  constructor(
    public editDialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User[]
  ) {}

  submit() {
    this.editDialogRef.close(this.selectedUser)
  }

  cancel() {
    this.editDialogRef.close()
  }
}
