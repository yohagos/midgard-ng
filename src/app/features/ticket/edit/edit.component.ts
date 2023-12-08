import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TicketUpdateRequest, Tickets } from 'src/app/core/models/ticket.model';
import { TicketCategoriesEnum, TicketPrioritiesEnum, TicketStatusEnum } from '../shared/ticket.enum';
import { User, UserBasic } from 'src/app/core/models/user.model';
import { TicketService } from 'src/app/core/services/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { UserService } from 'src/app/core/services/user.service';
import { EditDialogComponent } from '../shared/edit-dialog/edit-dialog.component';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  receivedData!: Tickets
  includedUsers!: UserBasic[]
  userList!: UserBasic[]
  editForm!: FormGroup
  editMode = false

  categoryList!: string[]
  priorityList!: string[]
  statusList!: string[]

  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly ticketService: TicketService,
    public matDialog: MatDialog
  ) {
    let ticketID = this.route.snapshot.paramMap.get('id')
    if (ticketID !== null) {
      this.ticketService.getTicketById(ticketID).subscribe(
        result => {
          this.receivedData = result as Tickets
          this.includedUsers = this.receivedData.includedUsers
          this.fillForm()
        }
      )
      this.userService.getUserList().subscribe(
        res => {
          this.userList = res as UserBasic[]
        }
      )
    }
  }

  ngOnInit() {
    this.categoryList = Object.keys(TicketCategoriesEnum).filter((item) => {
      return isNaN(Number(item))
    })

    this.priorityList = Object.keys(TicketPrioritiesEnum).filter((item) => {
      return isNaN(Number(item))
    })

    this.statusList = Object.keys(TicketStatusEnum).filter((item) => {
      return isNaN(Number(item))
    })
  }

  fillForm() {
    this.editForm = this.formBuilder.group({
      title: new FormControl({value: this.receivedData.title, disabled: true}, Validators.required),
      content: new FormControl({value: this.receivedData.content, disabled: true}),
      priority: new FormControl({value: this.receivedData.priority, disabled: true}),
      categories: new FormControl({value: this.receivedData.categories, disabled: true}),
      status: new FormControl({value: this.receivedData.status, disabled: true}),
      owner: new FormControl({value:
        this.receivedData.owner.firstname + ' ' + this.receivedData.owner.lastname , disabled: true}),
    })
    this.editForm.markAsUntouched()
  }

  toggleAllFields() {
    if (this.editForm.disabled){
      this.editForm.enable()
      this.editMode = true
    } else {
      this.editForm.disable()
      this.editMode = false
    }
  }

  remove(user: User) {
    const index = this.receivedData.includedUsers.indexOf(user)
    if (index >= 0) {
      this.receivedData.includedUsers.splice(index, 1)

    }
  }

  openDialog() {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: { allUsers: this.userList, includedUsers: this.includedUsers }
    })
    dialogRef.afterClosed().subscribe((result: User[]) => {
      let includedUsers = this.formBuilder.array([])
      if (
        result.length > 0
      ) {
        result.forEach((user) => {
          if (user !== null) {
            this.updateIncludedUsers(user)
            let control = this.convertToFormControl(user)
            includedUsers.push(control)
          }
        })
        this.editForm.addControl("includedUsers", includedUsers);
      }
    })
  }

  changeOwnerDialog() {
    const dialogRef = this.matDialog.open(EditDialogComponent, {
      data: this.userList
    })
    dialogRef.afterClosed().subscribe((result: User) => {
      console.log(this.receivedData.owner);

      this.receivedData.owner = result as User

      this.editForm.get('owner')?.setValue(this.receivedData.owner.firstname + ' ' + this.receivedData.owner.lastname)
      console.log(this.editForm.value)
    })
  }

  updateIncludedUsers(user: User) {
    let check = this.receivedData.includedUsers.find(item => item.email === user.email)
    if (!check) {
      this.receivedData.includedUsers.push(user)
    }
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

  updateTicket() {
    const ticket: TicketUpdateRequest = {
      id: this.receivedData.id,
      content: this.editForm.controls['content'].value,
      priority: this.editForm.controls['priority'].value,
      categories: this.editForm.controls['categories'].value,
      title: this.editForm.controls['title'].value,
      status: this.editForm.controls['status'].value,
      ownerUser: this.receivedData.owner,
      includedUsers: []
    }

      /* this.ticketService.updateTicket(ticket).subscribe(
        result => {
          console.log(result)
        }
      ) */
  }

  cancel() {
    if (this.editForm.enabled) {
      this.editForm.disable()
      this.editMode = false
    }
  }
}
