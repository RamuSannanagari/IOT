import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuard } from './services/auth.guard';
import { OverviewComponent } from './modules/overview/components/overview/overview.component';

const routes: Routes = [{
  path: '',
  component: ProtectedComponent,
  children:[
  {
    path:'overview',
  loadChildren: './modules/overview/overview.module#OverviewModule'},
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
