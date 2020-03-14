import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'tracker',loadChildren:'./modules/tracker/tracker.module#TrackerModule'},
  {path:'dashboard',loadChildren:'./modules/dashboard/dashboard.module#DashboardModule'},
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
