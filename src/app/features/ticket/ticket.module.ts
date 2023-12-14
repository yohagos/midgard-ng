import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxEditorModule } from "ngx-editor";

import { TicketComponent } from "./ticket.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { FindComponent } from "./find/find.component";
import { DialogComponent } from "./shared/dialog/dialog.component";
import { EditDialogComponent } from "./shared/edit-dialog/edit-dialog.component";
import { CommentsComponent } from "./find/comments/comments.component";
import { UploadFileComponent } from "./shared/upload-file/upload-file.component";

import { FilterPipe } from "../../core/pipe/filter.pipe";

import { MaterialsModule } from "../../materials.module";

@NgModule({
  declarations: [
    TicketComponent,
    CreateComponent,
    EditComponent,
    FindComponent,

    DialogComponent,
    EditDialogComponent,
    CommentsComponent,
    UploadFileComponent,

    FilterPipe
  ],
  exports: [
    TicketComponent,
    CreateComponent,
    EditComponent,
    FindComponent,

    DialogComponent,
    EditDialogComponent,
    CommentsComponent,
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxEditorModule
  ]
})
export class TicketModule { }
