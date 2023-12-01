import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { DialogComponent } from './dialog/dialog.component';
import { TicketCategories } from '../shared/categories.enum';
import { TicketPriorities } from '../shared/priorities.enum';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  userList: User[] = []
  currentUser!: string
  createForm: FormGroup

  categoryList!: string[]
  priorityList!: string[]

  constructor(
    public fb: FormBuilder,
    private readonly userService: UserService,
    private matDialog: MatDialog
  ) {
    this.categoryList = Object.keys(TicketCategories).filter((item) => {
      return isNaN(Number(item))
    })

    this.priorityList = Object.keys(TicketPriorities).filter((item) => {
      return isNaN(Number(item))
    })

    this.createForm = this.fb.group({
      // Strings or single Informations
      title: new FormControl('Clean Code Architecture', Validators.required),
      content: new FormControl('Clean code provides more readability...', Validators.required),
      //ownerEmail: new FormControl(this.currentUser,Validators.required),
      priority: new FormControl('LOW', Validators.required),

      // Arrays
      categories: new FormControl('', Validators.required),
      //includedUsers: this.fb.array<User>([])
    })
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      res => this.currentUser = res.firstname + ' ' + res.lastname
    )
    this.userService.getUserList().subscribe(
      res => {
        this.userList = res
      }
    )
  }

  getCategoriesLength(): number {
    let list: string[] = this.createForm.get('categories')?.value
    console.log(list)
    return list.length
  }

  openDialog() {
    let selectedUsers: User[] = []
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: this.userList
    })
    dialogRef.afterClosed().subscribe(result => {
      selectedUsers = result
      let includedUsers = this.fb.array([])
      selectedUsers.forEach((user: User) => {
        if (user !== null) {
          let control = this.convertToFormControl(user)
          includedUsers.push(control)
        }
      })
      this.createForm.setControl("includedUsers", includedUsers);
      console.log(this.createForm.value);

    })
  }

  convertToFormControl(user: User): FormControl<User> {
    if (user !== null && user !== undefined) {
      let control = new FormControl<User>(user);
      return control as FormControl<User>
    }
    return new FormControl()
  }

  createTicket() {
    this.clearFields()
  }

  clearFields() {
    this.createForm.reset()
  }
}
