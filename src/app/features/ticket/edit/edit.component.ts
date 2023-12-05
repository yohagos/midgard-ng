import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tickets } from 'src/app/core/models/ticket.model';
import { TicketCategories } from '../shared/categories.enum';
import { TicketPriorities } from '../shared/priorities.enum';
import { User } from 'src/app/core/models/user.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  receivedData!: Tickets
  ticketOwner!: User
  editForm!: FormGroup

  categoryList!: string[]
  priorityList!: string[]

  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.receivedData = params as Tickets;
      this.ticketOwner = this.receivedData.owner as User
    })
    this.editForm = this.formBuilder.group({
      title: new FormControl({value: this.receivedData.title, disabled: true}, Validators.required),
      content: new FormControl({value: this.receivedData.content, disabled: true}),
      priority: new FormControl({value: this.receivedData.priority, disabled: true}),
      categories: new FormControl({value: this.receivedData.categories, disabled: true}),
      owner: new FormControl({value:
        this.receivedData.owner.firstname + ' ' + this.receivedData.owner.lastname, disabled: true})
    })
    this.editForm.markAsUntouched()
    this.categoryList = Object.keys(TicketCategories).filter((item) => {
      return isNaN(Number(item))
    })

    this.priorityList = Object.keys(TicketPriorities).filter((item) => {
      return isNaN(Number(item))
    })
  }

  toggleAllFields() {
    if (this.editForm.disabled){
      this.editForm.enable()
    } else {
      this.editForm.disable()
    }
  }

  updateTicket() {
    console.log('save button');

    if (this.editForm.dirty) {
      console.log(this.editForm.value)
    }
  }

  cancel() {
    console.log('cancel button');

    if (this.editForm.enabled) {
      this.editForm.disable()
    }
  }
}
