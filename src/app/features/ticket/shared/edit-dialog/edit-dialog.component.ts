import { Component, Inject, OnChanges } from '@angular/core';
import { User, UserBasic } from 'src/app/core/models/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent {
  editDialogForm: FormGroup

  constructor(
    public editDialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User[],
    public formBuilder: FormBuilder
  ) {
    this.editDialogForm = this.formBuilder.group({
      user: new FormControl()
    })
  }

  submit() {
    let user = this.editDialogForm.get('user')?.value
    let [id] = user
    this.editDialogRef.close(id)
  }

  cancel() {
    this.editDialogRef.close()
  }
}
