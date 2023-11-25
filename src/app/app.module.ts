import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { EMPTY } from "rxjs";

import { AppRoutingModule } from './app-routing.module';
import { MaterialsModule } from "./materials.module";
import { AppComponent } from './app.component';
import { HomeComponent } from "./features/home/home.component";
import { LoginComponent } from "./features/login/login.component";
import { ProfileComponent } from "./features/profile/profile.component";
import { SignupComponent } from "./features/signup/signup.component";

import { JwtService } from './core/services/jwt.service';
import { UserService } from './core/services/user.service';
import { ApiInterceptor } from './core/interceptor/api.interceptor';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { TokenInterceptor } from './core/interceptor/token.interceptor';

export function initAuth(
  jwtService: JwtService,
  userService: UserService
) {
  return () => (jwtService.getToken() ? userService.getCurrentUser() : EMPTY)
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [JwtService, UserService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
