import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User, UserBasic } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { DialogComponent } from './dialog/dialog.component';
import { TicketCategories } from '../shared/categories.enum';
import { TicketPriorities } from '../shared/priorities.enum';
import { TicketService } from 'src/app/core/services/ticket.service';
import { TicketCreateRequest } from 'src/app/core/models/ticket.model';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  userList: UserBasic[] = []
  currentUser!: string
  owner!: UserBasic
  createForm: FormGroup

  categoryList!: string[]
  priorityList!: string[]

  constructor(
    public fb: FormBuilder,
    private readonly userService: UserService,
    private readonly ticketService: TicketService,
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
      priority: new FormControl('LOW', Validators.required),
      categories: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (res: User) => {
        this.currentUser = res.firstname + ' ' + res.lastname
        this.owner = res as unknown as UserBasic
      }
    )
    this.userService.getUserList().subscribe(
      res => {
        this.userList = res as unknown as UserBasic[]
      }
    )
  }

  getCategoriesLength(): number {
    let list: string[] = this.createForm.get('categories')?.value
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
      selectedUsers.forEach((user) => {
        if (user !== null) {
          let control = this.convertToFormControl(user)
          includedUsers.push(control)
        }
      })
      this.createForm.addControl("includedUsers", includedUsers);
      this.createForm.setControl(
        'ownerEmail', new FormControl(this.owner.email, Validators.required)
      )
    })
  }

  convertToFormControl(user: any): FormControl<UserBasic> {
    if (user !== null && user !== undefined) {
      let test: UserBasic = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role
      }
      let control = new FormControl<UserBasic>(test);
      return control as FormControl<UserBasic>
    }
    return new FormControl()
  }

  createTicket() {
    this.ticketService.addNewTicket(this.createForm.value as TicketCreateRequest).subscribe(res => {
      console.log(res)
    })
    this.clearFields()
  }

  clearFields() {
    this.createForm.reset()
  }
}
