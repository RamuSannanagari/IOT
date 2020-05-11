import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtPanelsComponent } from './ht-panels/ht-panels.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HtPanelsComponent
    
  }]


@NgModule({
  declarations: [HtPanelsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HtPanelsModule { }
