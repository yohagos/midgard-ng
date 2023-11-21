import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
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
    const token = this.jwtService.getToken()
    console.log(token);
      const request = req.clone({
        setHeaders: {
          ...(token ? {Authorization: `Bearer ${token}`} : {})
        }
      })
      return next.handle(request)
  }
}
