import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { FindComponent } from "./find/find.component";

import { DialogComponent } from "./create/dialog/dialog.component";

import { MaterialsModule } from "../../materials.module";


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    FindComponent,

    DialogComponent
  ],
  exports: [
    CreateComponent,
    EditComponent,
    FindComponent,

    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialsModule,
    ReactiveFormsModule
  ]
})
export class TicketModule { }
