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
        .post<User>("auth/register", {user: credentials})
        .pipe(tap((user) => this.setAuth(user)))
  }

  login(credentials: {
    email: string;
    password: string;
  }) {
    return this.http
      .post<User>("auth/authenticate", {user: credentials})
      .pipe(tap((user) => this.setAuth(user)))
  }

  test() {
    return this.http.get("auth/")
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

  update(user: Partial<User>) {
    return this.http.put<User>("user", {user})
      .pipe(
        tap((user) => {
          this.currentUserSubject.next(user)
        })
      )
  }


  setAuth(user: User) {
    this.jwtService.saveToken(user.token)
    this.currentUserSubject.next(user)
  }

  purgeAuth() {
    this.jwtService.destroyToken()
    this.currentUserSubject.next(null)
  }
}

