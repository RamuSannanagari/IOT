import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SldComponent } from './sld/sld.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SldComponent
    
  }]

@NgModule({
  declarations: [SldComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SldModule { }
