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

{path:'plant-view',loadChildren:'./modules/plant-view/plant-view.module#PlantViewModule',
canActivate: [AuthOthersGuard],
runGuardsAndResolvers: 'always'
},
{path:'sld',loadChildren:'./modules/sld/sld.module#SldModule',
canActivate: [AuthOthersGuard],
runGuardsAndResolvers: 'always'
},
{path:'layout',loadChildren:'./modules/layout/layout.module#LayoutModule',
canActivate: [AuthOthersGuard],
runGuardsAndResolvers: 'always'
},
{path:'power',loadChildren:'./modules/power/power.module#PowerModule',
canActivate: [AuthOthersGuard],
runGuardsAndResolvers: 'always'
},
{path:'ht-panels',loadChildren:'./modules/ht-panels/ht-panels.module#HtPanelsModule',
canActivate: [AuthOthersGuard],
runGuardsAndResolvers: 'always'
},
{path:'inverters',loadChildren:'./modules/inverters/inverters.module#InvertersModule',
canActivate: [AuthOthersGuard],
runGuardsAndResolvers: 'always'
},
{path:'rmu',loadChildren:'./modules/rmu/rmu.module#RmuModule',
canActivate: [AuthOthersGuard],
runGuardsAndResolvers: 'always'
},

{path:'alarms',loadChildren:'./modules/alarms/alarms.module#AlarmsModule',
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
