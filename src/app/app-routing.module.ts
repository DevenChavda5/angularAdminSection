import { AuthGuardService } from './services/authG/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';
import { ReportingComponent } from './reporting/reporting.component';
import { ProductsComponent } from './products/products.component';
import { MembersComponent } from './members/members.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'das', component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'members', component: MembersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'products', component: ProductsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'reporting', component: ReportingComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'users', component: UsersComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
