import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerComponent } from './power/power.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: PowerComponent
    
  }]


@NgModule({
  declarations: [PowerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PowerModule { }
