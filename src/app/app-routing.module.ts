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
  },
  { path: 'members', component: MembersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'reporting', component: ReportingComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }

