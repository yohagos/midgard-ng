import { NgModule } from '@angular/core';

import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { FindComponent } from "./find/find.component";



@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    FindComponent
  ],
  exports: [
    CreateComponent,
    EditComponent,
    FindComponent,

  ]
})
export class TicketModule { }
