import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User, UserBasic } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  selectedUsers!: UserBasic[]

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {allUsers: UserBasic[], includedUsers: UserBasic[]}
  ) { }

  submit() {
    this.dialogRef.close(this.selectedUsers)
  }

  cancel() {
    this.selectedUsers = []
    this.dialogRef.close()
  }

  checkUserIsPresentInIncludedUsers(user: UserBasic): boolean {
    let check = this.data.includedUsers.find(item => item.email === user.email)
    return check !== undefined ? true : false
  }

}
