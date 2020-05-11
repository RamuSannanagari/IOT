import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmsComponent } from './alarms/alarms.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: AlarmsComponent
    
  }]


@NgModule({
  declarations: [AlarmsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AlarmsModule { }
