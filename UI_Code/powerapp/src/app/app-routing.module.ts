import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [{
  path: '',
  component: ProtectedComponent,
  children:[
  {
    path:'overview',
  loadChildren: './modules/overview/overview.module#OverviewModule'},

  {path:'smb',loadChildren:'./modules/smb/smb.module#SmbModule'},

  {path:'tracker',loadChildren:'./modules/tracker/tracker.module#TrackerModule'},
  
  {
    path:'',
    redirectTo: '/overview',
    pathMatch:'full'
}

],
canActivate: [AuthGuard],
runGuardsAndResolvers: 'always'
},
{ path: 'login', loadChildren: './modules/login/login.module#LoginModule'},
{ path: '**', redirectTo: '/overview' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
