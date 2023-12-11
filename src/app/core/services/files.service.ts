import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private readonly http: HttpClient
  ){}

  getAllFiles() {
    return this.http.get('files')
  }

  uploadSingleFile(body: FormData, ticket_id: number) {
    return this.http.post(`files/add/${ticket_id}`, body)
  }

}
