import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { LoginComponent } from './features/login/login.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { SignupComponent } from './features/signup/signup.component';
import { TicketComponent } from "./features/ticket/ticket.component";

import { AuthGuardService } from './core/services/auth-guard.service';
import { FindComponent } from './features/ticket/find/find.component';
import { CreateComponent } from './features/ticket/create/create.component';
import { EditComponent } from './features/ticket/edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'ticket',
        component: TicketComponent,
        canActivate: [AuthGuardService],
        children:[
            {
              path:'',
              redirectTo:"find",
              pathMatch:"full"
            },
            {
              path: 'find',
              component: FindComponent
            },
            {
              path: 'create',
              component: CreateComponent,
            },
            {
              path: 'edit',
              component: EditComponent,
            }
        ]
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
