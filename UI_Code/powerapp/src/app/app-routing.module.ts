import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProtectedComponent } from './components/protected/protected.component';
import { AuthTtdGuard } from './helpers/auth-ttd.guard';
import { AuthOthersGuard } from './helpers/auth-others.guard';
import { RedirectGuardService } from './helpers/redirect-guard.service';



const routes: Routes = [{
  path: '',
  component: ProtectedComponent,
  children:[
    
  {
    path:'station',
  loadChildren: './modules/sub-station/sub-station.module#SubStationModule',
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
{ path : '' , pathMatch: 'full' , redirectTo : '' , canActivate : [RedirectGuardService]}, 
  
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
