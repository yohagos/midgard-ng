import { Component, Input } from '@angular/core';
import { FilesService } from 'src/app/core/services/files.service';
import { throwError } from "rxjs";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent {
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  file: File | null = null

  @Input() ticket_id!: number

  constructor(
    private readonly filesService: FilesService
  ) {}

  onChange(event: any) {
    const file: File = event.target.files[0]
    console.log(event.target.files[0]);


    if (file) {
      this.status = "initial"
      this.file = file
    }
  }

  onUpload() {
    console.log(this.file)
    console.log(this.ticket_id)
    if (this.file && this.ticket_id) {
      	const formData = new FormData()
        formData.append('file', this.file)

        const upload$ = this.filesService.uploadSingleFile(formData, this.ticket_id)

        this.status = 'uploading'

        upload$.subscribe({
          next: () => {
            this.status = 'success'
          },
          error: (error: any) => {
            this.status = 'fail'
            return throwError(() => error)
          }
        })
    }
  }

  onClick() {
    this.filesService.getAllFiles().subscribe(
      res => {
        console.log(res)
      }
    )
  }

}
