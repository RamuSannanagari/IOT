import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvertersComponent } from './inverters/inverters.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: InvertersComponent
    
  }]

@NgModule({
  declarations: [InvertersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InvertersModule { }
