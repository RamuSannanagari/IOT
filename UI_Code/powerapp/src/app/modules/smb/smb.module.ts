import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SmbRouteComponent } from './smb-route/smb-route.component';
import { SMBResolver } from './resolver/smb.resolve';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSelectModule } from 'ngx-select-ex';
const routes: Routes = [
  {
    path: '',
    component: SmbRouteComponent,
    resolve: { smbInfo: SMBResolver }
    
  }]
@NgModule({
  declarations: [SmbRouteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NgxSelectModule,
    RouterModule.forChild(routes)
  ]
})
export class SmbModule { }
