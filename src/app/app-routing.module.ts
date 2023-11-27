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
import { TicketModule } from './features/ticket/ticket.module';

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
              path: 'find',
              component: FindComponent,
              outlet: 'find'
            },
            {
              path: 'create',
              component: CreateComponent,
              outlet: 'create'
            },
            {
              path: 'edit',
              component: EditComponent,
              outlet: 'edit'
            }
          ]

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
