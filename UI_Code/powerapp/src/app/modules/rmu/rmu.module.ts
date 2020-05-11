import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RmuComponent } from './rmu/rmu.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RmuComponent
    
  }]

@NgModule({
  declarations: [RmuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RmuModule { }
