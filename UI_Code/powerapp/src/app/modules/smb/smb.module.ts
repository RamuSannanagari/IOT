import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SmbRouteComponent } from './smb-route/smb-route.component';

const routes: Routes = [
  {
    path: '',
    component: SmbRouteComponent,
    
  }]
@NgModule({
  declarations: [SmbRouteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SmbModule { }
