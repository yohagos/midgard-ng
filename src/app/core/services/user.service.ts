import { Injectable } from "@angular/core";
import {
  Observable,
  BehaviorSubject,
  distinctUntilChanged,
  map,
  tap,
  shareReplay
} from "rxjs";

import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtService } from "./jwt.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  public currentUser = this.currentUserSubject
      .asObservable()
      .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user))

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly jwtService: JwtService
  ) {}

  register(credentials: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) {
    return this.http
        .post<User>("auth/register", credentials)
        .pipe(tap((user) => this.setAuth(user)))
  }

  login(credentials: any) {
    return this.http
      .post<User>("auth/authenticate", credentials, {withCredentials: true})
      .pipe(tap((user) => this.setAuth(user)))
  }

  logout() {
    this.purgeAuth()
    void this.router.navigate(["/"])
  }

  getCurrentUser() {
    return this.http.get(`user/{email}`)
      .pipe(
        tap({
          next: (user) => this.setAuth(user as User),
          error: () => this.purgeAuth()
        }),
        shareReplay(1)
      )
  }

  getUser() {
    let email = this.jwtService.getEmail()
    return this.http.get<User>(`user/email`, email)
  }

  update(user: Partial<User>) {
    return this.http.put<User>("user", {user})
      .pipe(
        tap((user) => {
          this.currentUserSubject.next(user)
        })
      )
  }


  setAuth(user: User) {
    this.jwtService.saveToken(user.accessToken)
    this.jwtService.saveEmail(user.email)
    this.currentUserSubject.next(user)
  }

  purgeAuth() {
    this.jwtService.destroyToken()

    this.currentUserSubject.next(null)
  }
}

