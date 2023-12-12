import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FileSaverOptions } from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private readonly http: HttpClient
  ){}

  getAllFiles() {
    return this.http.get('files/all')
  }

  uploadSingleFile(body: FormData, ticket_id: number) {
    return this.http.post(`files/add/${ticket_id}`, body)
  }

  uploadMultipleFiles(body: FormData, ticket_id: number) {
    return this.http.post(`files/add/multiple/${ticket_id}`, body)
  }

  getFilesForTicket(ticket_id: string) {
    return this.http.get(`files/${ticket_id}`)
  }

  downloadFileById(file_id: number): Observable<Blob> {
    return this.http.get(`download/${file_id}`, {
      responseType: 'blob'
    })
  }

}
