import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('files')) {
      const apiReq = req.clone({
        url: `http://localhost:9000/api/v1/${req.url}`
      })
      return next.handle(apiReq);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const apiReq = req.clone({
      url: `http://localhost:9000/api/v1/${req.url}`,
      headers: headers
    })
    return next.handle(apiReq);
  }
}
