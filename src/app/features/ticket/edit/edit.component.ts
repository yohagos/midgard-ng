import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tickets } from 'src/app/core/models/ticket.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  receivedData!: any

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.receivedData = params;
    })
  }

}
