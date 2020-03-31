import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProtectedComponent } from './components/protected/protected.component';
import { AuthTtdGuard } from './helpers/auth-ttd.guard';
import { AuthOthersGuard } from './helpers/auth-others.guard';



const routes: Routes = [{
  path: '',
  component: ProtectedComponent,
  children:[
    
  {
    path:'overview',
  loadChildren: './modules/overview/overview.module#OverviewModule',
  canActivate: [AuthTtdGuard],
  runGuardsAndResolvers: 'always'
},

  {path:'smb',loadChildren:'./modules/smb/smb.module#SmbModule',
  canActivate: [AuthOthersGuard],
  runGuardsAndResolvers: 'always'
},

  {path:'tracker',loadChildren:'./modules/tracker/tracker.module#TrackerModule',
  canActivate: [AuthOthersGuard],
  runGuardsAndResolvers: 'always'
},
  
//   {
//     path:'',
//     redirectTo: '/overview',
//     pathMatch:'full'
// }

],

},
{ path: 'login', loadChildren: './modules/login/login.module#LoginModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
