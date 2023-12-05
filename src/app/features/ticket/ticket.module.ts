import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TicketComponent } from "./ticket.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { FindComponent } from "./find/find.component";
import { DialogComponent } from "./create/dialog/dialog.component";

import { MaterialsModule } from "../../materials.module";

@NgModule({
  declarations: [
    TicketComponent,
    CreateComponent,
    EditComponent,
    FindComponent,

    DialogComponent
  ],
  exports: [
    TicketComponent,
    CreateComponent,
    EditComponent,
    FindComponent,

    DialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class TicketModule { }
