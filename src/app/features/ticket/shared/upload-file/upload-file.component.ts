import { Component, Input, OnInit } from '@angular/core';
import { FilesService } from 'src/app/core/services/files.service';
import { throwError } from "rxjs";
import { saveAs } from "file-saver";
import { Files } from 'src/app/core/models/file.model';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent implements OnInit {
  file: File | null = null
  selectedFiles!: File[]
  @Input() ticket_id!: number

  files: Files[] = []
  @Input() editMode!: boolean

  constructor(
    private readonly filesService: FilesService
  ) {
  }

  ngOnInit() {
      this.loadFiles()
  }

  onChange(event: any) {
    this.selectedFiles = event.target.files
  }

  remove(f: Files) {
    const index = this.files.indexOf(f)
    if (index >= 0) {
      this.files.splice(index, 1);
    }
  }

  onUpload() {
    if (this.selectedFiles && this.ticket_id) {
      	const formData = new FormData()
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('files', this.selectedFiles[i])
        }
        const upload$ = this.filesService.uploadMultipleFiles(formData, this.ticket_id)
          upload$.subscribe({
            next: () => {
              this.loadFiles()
            },
            error: (error: any) => {
              return throwError(() => error)
            }
        })
    }
  }

  loadFiles() {
    this.filesService.getFilesForTicket(`${this.ticket_id}`).subscribe(
      (res) => {
        this.files = res as Files[]
      }
    )
  }

  downloadFile(file: Files) {
    console.log(file)
    this.filesService.downloadFileById(file.id)
    .subscribe(blob => {
      saveAs(blob, file.filename)
    })
  }

}
