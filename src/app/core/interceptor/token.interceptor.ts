import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, EMPTY } from "rxjs";
import { JwtService } from "../services/jwt.service";

@Injectable({
  providedIn: "root"
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private readonly jwtService: JwtService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Token interceptor')
    const token = this.jwtService.getToken()

    const request = req.clone({
      setHeaders: {
        ...(token ? {Authorization: `Bearer ${token}`} : '')
      }
    })

    console.table(request)
    return next.handle(request)
  }
}
