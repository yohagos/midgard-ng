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
  createForm: FormGroup
  includedUsers!: User[]
  categories!: string[]
  priorities!: string[]

  constructor(
    public fb: FormBuilder,
    private readonly userService: UserService,
    private matDialog: MatDialog
  ) {
    this.createForm = this.fb.group({
      title: new FormControl('Clean Code Architecture', Validators.required),

      content: new FormControl('Clean code provides more readability...', Validators.required),
      categories: new FormArray([
        new FormControl(null)
      ], Validators.required),
      priority: new FormControl('', Validators.required)
    })
  }

  /*
  ownerEmail: new FormControl(this.userService.getUser,Validators.required),
  includedUsers: new FormArray([
        new FormControl(null)
      ], Validators.required), */

  ngOnInit() {
    this.userService.getUserList().subscribe(
      res => {
        this.userList = res
      }
    )

    this.categories = Object.keys(TicketCategories).filter((item) => {
      return isNaN(Number(item))
    })

    this.priorities = Object.keys(TicketPriorities).filter((item) => {
      return isNaN(Number(item))
    })
  }

  openDialog() {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: this.userList
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  createTicket() {
    console.log('create ticket button');
  }
}
