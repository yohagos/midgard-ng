import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { EMPTY } from "rxjs";

import { AppRoutingModule } from './app-routing.module';
import { MaterialsModule } from "./materials.module";
import { TicketModule } from "./features/ticket/ticket.module";

import { AppComponent } from './app.component';
import { HeaderComponent } from "./shared/header/header.component";
import { HomeComponent } from "./features/home/home.component";
import { LoginComponent } from "./features/login/login.component";
import { NavigationComponent } from "./shared/navigation/navigation.component";
import { ProfileComponent } from "./features/profile/profile.component";
import { SignupComponent } from "./features/signup/signup.component";
import { TicketComponent } from "./features/ticket/ticket.component";

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
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    ProfileComponent,
    SignupComponent,
    TicketComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialsModule,
    TicketModule
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
