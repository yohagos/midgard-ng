import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TicketUpdateRequest, Tickets } from 'src/app/core/models/ticket.model';
import { TicketCategoriesEnum, TicketPrioritiesEnum, TicketStatusEnum } from '../shared/ticket.enum';
import { User, UserBasic } from 'src/app/core/models/user.model';
import { TicketService } from 'src/app/core/services/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../create/dialog/dialog.component';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  receivedData!: Tickets
  userList!: UserBasic[]
  editForm!: FormGroup

  categoryList!: string[]
  priorityList!: string[]
  statusList!: string[]

  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private readonly ticketService: TicketService,
    public matDialog: MatDialog
  ) {
    let ticketID = this.route.snapshot.paramMap.get('id')
    if (ticketID !== null) {
      this.ticketService.getTicketById(ticketID).subscribe(
        result => {
          this.receivedData = result as Tickets
          this.userList = this.receivedData.includedUsers
          this.fillForm()
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
    //includedUsers: new FormControl({value: this.receivedData.includedUsers, disabled: true})
    this.editForm.markAsUntouched()
  }

  toggleAllFields() {
    if (this.editForm.disabled){
      this.editForm.enable()
    } else {
      this.editForm.disable()
    }
  }

  openDialog() {
    let selectedUsers: User[] = []
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: this.userList
    })
    dialogRef.afterClosed().subscribe(result => {
      selectedUsers = result
      let includedUsers = this.formBuilder.array([])
      selectedUsers.forEach((user) => {
        if (user !== null) {
          let control = this.convertToFormControl(user)
          includedUsers.push(control)
        }
      })
      this.editForm.addControl("includedUsers", includedUsers);
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

  updateTicket() {
    let owner:UserBasic = {
      id: this.receivedData.owner.id,
      firstname: this.receivedData.owner.firstname,
      lastname: this.receivedData.owner.lastname,
      email: this.receivedData.owner.email
    }

    console.log(owner)
      const ticket: TicketUpdateRequest = {
        id: this.receivedData.id,
        content: this.editForm.controls['content'].value,
        priority: this.editForm.controls['priority'].value,
        categories: this.editForm.controls['categories'].value,
        title: this.editForm.controls['title'].value,
        status: this.editForm.controls['status'].value,
        ownerUser: owner,
        includedUsers: []
      }

      console.log(ticket);

      /* this.ticketService.updateTicket(ticket).subscribe(
        result => {
          console.log(result)
        }
      ) */
  }

  cancel() {
    if (this.editForm.enabled) {
      this.editForm.disable()
    }
  }
}
